import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { Button } from "@/components/Common/Button";

export const RelatedPosts = ({
  mainTitle,
  subtitle,
  posts,
  readMoreText,
  twoItems = false,
  buttonLink = null,
  buttonText = null,
}) => {
  return (
    <section className="padded-container">
      <div className="text-left tablet:text-center post-preview-cards">
        <h2 className="font-bold">{mainTitle}</h2>
        {subtitle && (
          <p className="mt-4 tablet:mt-6 max-w-xl mx-auto">{subtitle}</p>
        )}
      </div>
      <div
        className={clsx(
          twoItems ? "two-item-preview-grid" : "preview-grid",
          "mt-10 laptop:mt-16 mx-auto"
        )}
      >
        {posts.map((item) => {
          console.log("mapping!, item", item);
          return (
            <>
              <a href={`${item.url}`}>
                <PrismicNextImage
                  className={clsx(
                    "shadow mt-2 laptop:mt-0 mx-auto rounded-full"
                  )}
                  field={item.data.image}
                />
              </a>

              <div
                className={clsx(
                  "mt-2 laptop:mt-0",
                  "overflow-hidden text-ellipsis"
                )}
              >
                <PrismicRichText
                  field={item.data.title}
                  components={{
                    paragraph: ({ children }) => {
                      return <p className="mt-4">{children}</p>;
                    },
                    heading2: ({ children }) => {
                      return <p className="mt-4">{children}</p>;
                    },
                  }}
                />
              </div>
              <div className={clsx("mt-4 laptop:mt-0")}>
                <a href={item.url}>
                  <p className="underline-offset-4 underline hover:font-semibold">
                    {readMoreText}
                  </p>
                </a>
              </div>
            </>
          );
        })}
      </div>
      {buttonText && buttonLink && (
        <div className="w-full flex justify-center my-12 tablet:mt-20 tablet:mb-4">
          <Button link={buttonLink}>{buttonText}</Button>
        </div>
      )}
    </section>
  );
};
