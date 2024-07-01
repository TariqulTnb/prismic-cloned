import { createClient } from "@/prismicio";
import { PageLayout } from "@/components/PageLayout";
import { BlogHeader } from "@/components/BlogHeader";
import { useState, useEffect } from "react";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import * as prismic from "@prismicio/client";
import clsx from "clsx";
import BounceLoader from "react-spinners/BounceLoader";
import { useResponsive } from "@/hooks/useResponsive";
import { Pagination } from "@/components/Common/Pagination";
import { Dropdown } from "@/components/Blog/Dropdown";
import { formatDate } from "@/pages/blog/utils";
import { getLocales } from "@/lib/getLocales";
import { readMoreText } from "@/lib/utils";
import { useRouter } from "next/router";

export default function BlogPostIndex({
  blogPosts,
  locales,
  locale,
  navigation,
  settings,
  sideNav,
  footer,
  page,
  tags,
  postsByTags,
  firstFeaturedPost,
}) {
  console.log("blog posts", blogPosts);
  console.log("tags", tags);
  console.log("posts by tags", postsByTags);
  console.log("first", firstFeaturedPost);

  console.log("locales", locales);

  const router = useRouter();

  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(blogPosts);
  const [paginate, setPaginate] = useState(blogPosts?.total_pages > 1);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [featuredPost, setFeaturedPost] = useState(firstFeaturedPost);

  const { isLaptopSize } = useResponsive();

  const client = createClient();

  useEffect(() => {
    if (posts.total_pages > 1) {
      setPaginate(true);
    } else {
      setPaginate(false);
    }
  }, [posts.total_pages]);

  useEffect(() => {
    async function getPostsForPage() {
      setLoading(true);

      let props = {
        lang: locale,
        orderings: [
          {
            field: "my.blog_post.posted_at",
            direction: "desc",
          },
        ],
        pageSize: 6,
        page: currentPage,
      };

      if (selectedTag !== null) {
        props.filters = [prismic.filter.at("document.tags", [selectedTag])];
      }

      const blogPosts = await client.getByType("blog_post", props);

      console.log("new blog posts", blogPosts);

      setPosts(blogPosts);
      setLoading(false);
    }

    getPostsForPage();
  }, [currentPage, selectedTag, locale]);

  useEffect(() => {
    setFeaturedPost(posts.results[0] ?? null);
  }, [posts]);

  const pagesArray = new Array(posts.total_pages).fill(0).map((_, i) => i + 1);
  console.log("pages array", pagesArray);

  const getDropDownTagsBasedOnLocale = () => {
    if (locale === "ja-jp") {
      return ["全て", ...tags];
    } else {
      return ["All posts", ...tags];
    }
  };

  return (
    <PageLayout
      page={page}
      locales={locales}
      navigation={navigation}
      settings={settings}
      sideNav={sideNav}
      footer={footer}
      locale={router.locale}
    >
      {featuredPost && <BlogHeader post={featuredPost} indexPage={true} />}
      {!featuredPost && (
        <div className="my-20 padded-container text-xl text-center">
          {locale === "ja-jp" && (
            <div> このタグの結果は見つかりませんでした </div>
          )}
          {locale === "en-au" && (
            <div> No results were found for that tag. </div>
          )}
        </div>
      )}

      <div className="padded-container flex justify-center">
        <Dropdown
          open={dropdownOpen}
          setOpen={setDropdownOpen}
          menu={getDropDownTagsBasedOnLocale()}
          onItemSelect={(text) => {
            if (text === "全て" || text === "All posts") {
              setSelectedTag(null);
            } else {
              setSelectedTag(text);
            }
          }}
          trigger={(props) => (
            <button
              className="flex items-center justify-center w-[236px] h-[69px] bg-[#F1ECE5] font-bold"
              {...props}
            >
              {selectedTag === null && locale === "ja-jp" && "全て"}
              {selectedTag === null && locale === "en-au" && "All posts"}
              {selectedTag !== null && selectedTag}
            </button>
          )}
        ></Dropdown>
      </div>

      <div className="padded-container section-y-margin">
        {loading && (
          <div className="flex justify-center items-center h-96">
            <BounceLoader loading={loading} color={"#3B6552"} size={100} />
          </div>
        )}
        {!loading && (
          <div className="blog-index-grid">
            {posts.results.map((post, i) => (
              <PostCard key={i} post={post} locale={locale} />
            ))}
          </div>
        )}
        {isLaptopSize() && paginate && (
          <div className="w-full flex justify-end h-md mt-8">
            {currentPage !== 1 && (
              <div
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`bg-[#F1ECE5] cursor-pointer w-12 h-12 text-lg flex justify-center items-center p-1 ml-4 font-bold`}
              >
                <svg
                  width="14"
                  height="21"
                  viewBox="0 0 14 21"
                  fill="none"
                  className="inline"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector 74 (Stroke)"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.6081 0L14 3.18738L6.61211 10.5L14 17.8126L10.6081 21L0 10.5L10.6081 0Z"
                    fill="rgba(59, 101, 82, 1)"
                    fill-opacity="1"
                  />
                </svg>
              </div>
            )}
            {pagesArray.map((page) => {
              return (
                <DesktopPagination
                  key={page}
                  pageValue={page}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              );
            })}
            {posts.total_pages > currentPage && (
              <div
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`bg-[#F1ECE5] cursor-pointer w-12 h-12 text-lg flex justify-center items-center p-1 ml-4 font-bold`}
              >
                <svg
                  width="14"
                  height="21"
                  viewBox="0 0 14 21"
                  fill="none"
                  className="inline"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector 74 (Stroke)"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.39191 21L1.6287e-06 17.8126L7.38789 10.5L3.5012e-07 3.18738L3.39191 -9.7996e-07L14 10.5L3.39191 21Z"
                    fill="rgba(59, 101, 82, 1)"
                    fill-opacity="1"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
        {!isLaptopSize() && paginate && (
          <div className="w-full flex justify-center h-md mt-8">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageCount={blogPosts.total_pages}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}

const DesktopPagination = ({ pageValue, currentPage, setCurrentPage }) => {
  return (
    <div
      onClick={() => setCurrentPage(pageValue)}
      className={clsx(
        currentPage === pageValue ? "bg-ddGreen text-white" : "bg-[#F1ECE5]",
        `cursor-pointer w-12 h-12 text-lg flex justify-center items-center p-1 ml-4 font-bold`
      )}
    >
      {pageValue}
    </div>
  );
};

const PostCard = ({ post, locale }) => {
  return (
    // <PrismicNextLink href={post?.url}>
    <div className="flex flex-col mx-auto h-full">
      <PrismicNextImage className="h-sm" field={post?.data?.image} />
      <div className="flex-grow flex flex-col w-full items-center">
        <div className="flex-grow">
          {post.tags.map((tag, index) => {
            return (
              <div
                key={index}
                className="inline-block mt-4 px-2 mx-4 py-1 text-white bg-[#D9D9D9]"
              >
                {tag}
              </div>
            );
          })}
          <div className="inline-block mt-2 text-[16px] ml-2">
            {formatDate(post.data.posted_at, post.lang)}
          </div>
          <div className="mt-4 mx-4">
            <PrismicRichText
              field={post.data.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-[24px]">{children}</h2>
                ),
              }}
            />
          </div>
        </div>
        <div className="w-full text-left px-4 my-6">
          <a
            className="pb-0 mb-0 underline underline-offset-4 text-left"
            href={post.url}
          >
            {readMoreText(locale)}
          </a>
        </div>
      </div>
    </div>
    // </PrismicNextLink>
  );
};

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const sideNav = await client.getSingle("side_navigation", { lang: locale });
  const footer = await client.getSingle("footer", { lang: locale });

  const blogPosts = await client.getByType("blog_post", {
    lang: locale,
    orderings: [
      {
        field: "my.blog_post.posted_at",
        direction: "desc",
      },
    ],
    pageSize: 6,
    page: 1,
  });

  let tags;

  tags = await client.getTags();

  const postsByTags = {};

  const firstFeaturedPost = blogPosts.results.find(
    (post) => post.data.featured
  );

  tags.forEach((tag) => {
    postsByTags[tag] = [];
    blogPosts.results.forEach((post) => {
      if (post.tags.includes(tag)) {
        postsByTags[tag].push(post);
      }
    });
  });

  const page = await client.getSingle("blog_index", { lang: locale });

  const locales = await getLocales(page, client);

  return {
    props: {
      navigation,
      settings,
      sideNav,
      footer,
      blogPosts,
      page,
      tags,
      postsByTags,
      firstFeaturedPost,
      locale,
      locales,
    },
  };
}
