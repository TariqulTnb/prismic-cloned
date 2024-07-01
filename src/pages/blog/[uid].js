import { createClient } from "@/prismicio";
import { PageLayout } from "@/components/PageLayout";
import * as prismic from "@prismicio/client";
import { RelatedPosts } from "@/components/RelatedPosts";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/";
import { BlogHeader } from "@/components/BlogHeader";
import { readMoreText } from "@/lib/utils";
import { useRouter } from "next/router";
import { getLocales } from "@/lib/getLocales";

export default function BlogPost({
  blogPost,
  locales,
  navigation,
  settings,
  sideNav,
  footer,
  relatedPosts,
  otherPosts,
}) {
  console.log("blog post", blogPost);
  console.log("related posts", relatedPosts);
  console.log("other posts", otherPosts);

  console.log("locales here", locales);

  let contextData = {
    uid: blogPost.uid,
    tags: blogPost?.tags,
    url: blogPost?.url,
    publishedAt: blogPost?.first_publication_date,
    updatedAt: blogPost?.last_publication_date,
  };

  const getMainTitle = () => {
    return relatedPosts.results.length > 2 ? "Related Posts" : "Other Posts";
  };

  const posts =
    relatedPosts.results.length > 2
      ? relatedPosts.results
      : otherPosts.slice(0, 3);

  const router = useRouter();

  return (
    <PageLayout
      page={blogPost}
      locales={locales}
      navigation={navigation}
      settings={settings}
      sideNav={sideNav}
      locale={router.locale}
      footer={footer}
    >
      <BlogHeader post={blogPost} />
      <SliceZone
        slices={blogPost.data.slices}
        components={components}
        context={contextData}
      />
      <div className="padded-container section-y-margin-xl">
        <RelatedPosts
          mainTitle={getMainTitle()}
          posts={posts}
          readMoreText={readMoreText(router.locale)}
        />
      </div>
    </PageLayout>
  );
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const uid = params.uid; // Get the uid from params

  // Fetch the individual blog post using the uid
  const blogPost = await client.getByUID("blog_post", uid, {
    lang: locale,
  });

  const locales = await getLocales(blogPost, client);

  let hasTags = false;
  let relatedPosts = [];
  let otherPosts = [];

  if (blogPost.tags.length > 0) {
    hasTags = true;
    relatedPosts = await client.getByTag(blogPost.tags[0], {
      lang: locale,
      pageSize: 3,
      filters: [prismic.filter.not("document.id", blogPost.id)],
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
    });
  }

  // if there are no tags on the post or not enough related posts to display, get other posts
  if (!hasTags || relatedPosts?.results.length < 3) {
    otherPosts = await client.getAllByType("blog_post", {
      lang: locale,
      pageSize: 3,
      filters: [prismic.filter.not("document.id", blogPost.id)],
    });
  }

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const sideNav = await client.getSingle("side_navigation", { lang: locale });
  const footer = await client.getSingle("footer", { lang: locale });

  return {
    props: {
      blogPost,
      navigation,
      settings,
      sideNav,
      footer,
      relatedPosts,
      otherPosts,
      locales,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  // Fetch all blog posts to generate static paths
  const blogPosts = await client.getAllByType("blog_post", { lang: "*" });

  const paths = blogPosts.map((post) => ({
    params: { uid: post.uid },
    locale: post.lang,
  }));

  return {
    paths,
    fallback: false, // Set to 'blocking' or 'true' if you want to enable fallback behavior
  };
}
