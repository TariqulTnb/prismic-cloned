import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";
import { formatDate } from "@/pages/blog/utils";
import { readMoreText } from "@/lib/utils";
import { useRouter } from "next/router";

export const BlogHeader = ({ post, indexPage = false }) => {
  const router = useRouter();
  return (
    <section>
      <PrismicNextImage
        field={post?.data?.image}
        className="max-w-[1920px] w-full mx-auto"
      />
      <div className="padded-container section-y-margin flex flex-col items-center">
        {indexPage && <PostDetails post={post} />}
        <PrismicRichText
          field={post.data.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-center max-w-[800px]">{children}</h2>
            ),
          }}
        />
        {!indexPage && <PostDetails post={post} />}
        {indexPage && (
          <a href={post.url}>
            <div className="flex justify-center mt-2 underline underline-offset-4">
              {readMoreText(router)}
            </div>
          </a>
        )}
      </div>
    </section>
  );
};

const PostDetails = ({ post }) => {
  return (
    <div className="flex items-center mb-4">
      {post.data.featured && (
        <div className="mt-4 px-2 py-1 text-white bg-black">
          Featured Article
        </div>
      )}
      {post.tags.length > 0 &&
        post.tags.map((tag, index) => {
          console.log("tag", tag);
          return (
            <div
              key={index}
              className="mt-4 px-2 ml-4 py-1 text-white bg-[#D9D9D9]"
            >
              {tag}
            </div>
          );
        })}
      <div className="flex items-center h-full mt-3 text-[16px] ml-4">
        {formatDate(post.data.posted_at, post.lang)}
      </div>
    </div>
  );
};
