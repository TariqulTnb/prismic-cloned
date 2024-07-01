import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { LangSwitcher } from "./LangSwitcher";
import { Divide as Hamburger } from "hamburger-react";
import { Logo } from "./Logo";
import { useRouter } from "next/router";
import clsx from "clsx";
import { montserrat, noto } from "@/lib/fonts";

export function Header({
  locales = [],
  navigation,
  settings,
  isOpen,
  setOpen,
  navbarRef,
}) {
  const router = useRouter();

  const { locale } = router;

  return (
    <div
      ref={navbarRef}
      // workaround for bug in chrome that makes the top navbar disappear when you open the side nav
      className={clsx(
        `w-screen top-0 z-30 opacity-100 bg-white top-navbar fixed`,
        locale === "ja-jp" ? noto.className : montserrat.className,
        locale === "ja-jp" ? "font-noto" : "font-montserrat"
      )}
    >
      <header className="px-4 tablet:px-6 py-4 mx-auto w-full max-w-[1920px] ">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none">
          <Logo settings={settings} />
          <nav className="hidden laptop:flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-10">
            <ul className="flex flex-wrap items-center gap-6 md:gap-10">
              {navigation.data?.links.map((item) => (
                <li
                  key={prismic.asText(item.label)}
                  className={clsx(
                    "tracking-loose text-menuBlack hover:font-semibold text-[16px]",
                    router.asPath !== "/" &&
                      item.link.url.includes(router.asPath) &&
                      "font-semibold"
                  )}
                >
                  <PrismicNextLink field={item.link}>
                    <PrismicText field={item.label} />
                  </PrismicNextLink>
                </li>
              ))}
              {locales.length > 1 && <LangSwitcher locales={locales} />}
            </ul>
          </nav>
          <div className="text-black opacity-100">
            <Hamburger
              size={30}
              toggled={isOpen}
              toggle={setOpen}
              color="#000"
              label="Show menu"
              rounded
            />
          </div>
        </div>
      </header>
    </div>
  );
}
