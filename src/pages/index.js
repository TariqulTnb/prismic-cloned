import { getLocales } from "@/lib/getLocales";
import { createClient } from "@/prismicio";
import { PageLayout } from "@/components/PageLayout";
import { RelatedPosts } from "@/components/RelatedPosts";
import { useRouter } from "next/router";
import { readMoreText } from "@/lib/utils";

export default function Home({
  navigation,
  settings,
  locales,
  sideNav,
  footer,
  page,
  blogPosts,
}) {
  console.log("blog posts are", blogPosts);

  const router = useRouter();

  const newPostsTitleText = () => {
    if (router.locale === "en-au") {
      return "Dream Drive News";
    } else if (router.locale === "ja-jp") {
      return "Dream Drive 最新情報";
    }
  };

  const newPostsSubtitleText = () => {
    if (router.locale === "en-au") {
      return "Check out our van life tips, event info and campaign information here.";
    } else if (router.locale === "ja-jp") {
      return "Dream Driveのイベント出展情報やキャンペーン案内、キャンピングカーのお役立ち情報などご覧いただけます。";
    }
  };

  const newPostsButtonText = () => {
    if (router.locale === "en-au") {
      return "Related Articles";
    } else if (router.locale === "ja-jp") {
      return "他の記事も読む";
    }
  };

  return (
    <PageLayout
      locales={locales}
      navigation={navigation}
      settings={settings}
      sideNav={sideNav}
      footer={footer}
      page={page}
      sliceZone={true}
      locale={router.locale}
    >
      <RelatedPosts
        mainTitle={newPostsTitleText()}
        posts={blogPosts?.results}
        subtitle={newPostsSubtitleText()}
        buttonLink={"/blog"}
        buttonText={newPostsButtonText()}
        readMoreText={readMoreText(router.locale)}
      />
    </PageLayout>
  );
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "homepage", { lang: locale });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const sideNav = await client.getSingle("side_navigation", { lang: locale });
  const settings = await client.getSingle("settings", {
    lang: locale,
  });
  const footer = await client.getSingle("footer", { lang: locale });

  const blogPosts = await client.getByType("blog_post", {
    lang: locale,
    orderings: [
      {
        field: "my.blog_post.posted_at",
        direction: "desc",
      },
    ],
    pageSize: 3,
    page: 1,
  });

  const locales = await getLocales(page, client);

  return {
    props: {
      page,
      navigation,
      settings,
      locales,
      sideNav,
      footer,
      blogPosts,
      locale,
    },
  };
}
