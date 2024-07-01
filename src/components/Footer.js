import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import * as prismic from "@prismicio/client";
import { Bounded } from "./Bounded";
import { PrismicRichText } from "./PrismicRichText";
import { Logo } from "./Logo";
import { useRouter } from "next/router";
import clsx from "clsx";
import { montserrat, noto } from "@/lib/fonts";

export function Footer({ footer, settings }) {
  const { locale } = useRouter();

  return (
    <>
      <Bounded
        as="footer"
        yPadding="sm"
        className={clsx(
          locale === "ja-jp" ? "font-noto" : "font-montserrat",
          locale === "ja-jp" ? noto.className : montserrat.className,

          "footer bg-footerBrown flex flex-col justify-around laptop:flex-row laptop:items-center  text-white "
        )}
      >
        <div className="pt-0 pb-4 laptop:pt-2 flex flex-col justify-around laptop:flex-row laptop:justify-between">
          <div className="mt-5 laptop:mt-2 flex justify-center items-start">
            <Logo color="white" width={120} settings={settings} />
          </div>
          <div className="tablet:hidden flex justify-around w-full my-10">
            {footer.data.slices[0].items.map((item, idx) => {
              return <SocialMediaIcon item={item} key={idx} big />;
            })}
          </div>
          <FooterTextColumn footer={footer} columnText={"line_up_links"} />
          <FooterTextColumn footer={footer} columnText={"dream_drive_links"} />
          <FooterTextColumn footer={footer} columnText={"guide_links"} />
          {prismic.isFilled.richText(footer.data.company_info) && (
            <div className="mt-0 laptop:mt-0">
              <PrismicRichText
                field={footer.data.company_info}
                components={{
                  heading1: ({ children }) => (
                    <p className="footer-text footer-text-company-info-heading">
                      {children}
                    </p>
                  ),
                  paragraph: ({ children }) => (
                    <p className="footer-text footer-text-company-info">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          )}
        </div>
      </Bounded>
      <div className="w-full h-20 tablet:h-14 bg-[#181818]">
        <div className="mx-auto max-w-6xl h-full flex items-center justify-between px-6">
          <div className="tablet:flex text-center w-full">
            <PrismicRichText
              field={footer.data.copyright_text}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-white text-sm text-center tablet:text-left mb-2 tablet:mb-0">
                    {children}
                  </p>
                ),
              }}
            />
            <PrismicNextLink field={footer.data.privacy_policy_link}>
              <PrismicRichText
                field={footer.data.privacy_policy_text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-white text-sm tablet:ml-8">{children}</p>
                  ),
                }}
              />
            </PrismicNextLink>
          </div>
          <div className="hidden tablet:flex">
            {footer.data.slices[0].items.map((item, idx) => {
              return <SocialMediaIcon item={item} key={idx} />;
            })}
          </div>
        </div>
      </div>
      <div className="tablet:hidden h-[48px] w-full"></div>
    </>
  );
}

const SocialMediaIcon = ({ item, big = false }) => {
  return (
    <div
      className={clsx(
        big ? "w-9" : "w-6",
        "flex items-center h-full text-white mx-3"
      )}
    >
      <PrismicNextLink field={item.link}>
        <PrismicNextImage field={item.icon} />
      </PrismicNextLink>
    </div>
  );
};

const FooterTextColumn = ({ footer, columnText }) => {
  return (
    prismic.isFilled.richText(footer.data[columnText]) && (
      <div className="mb-10 laptop:mt-0">
        <PrismicRichText
          field={footer.data[columnText]}
          components={{
            heading1: ({ children }) => (
              <p className="footer-text footer-text-heading">{children}</p>
            ),
            paragraph: ({ children }) => (
              <p className="footer-text footer-text-sub-item">{children}</p>
            ),
          }}
        />
      </div>
    )
  );
};
