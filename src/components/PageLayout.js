import { Header } from "./Header";
import { Footer } from "./Footer";
import React from "react";
import { SideNav } from "./SideNav";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Head from "next/head";
import HeroHeightContext from "@/components/HeroHeightContext";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices/";
import * as prismic from "@prismicio/client";
import { useResponsive } from "@/hooks/useResponsive";
import { montserrat, noto } from "@/lib/fonts";
import { motion } from "framer-motion";
import { PrismicNextLink } from "@prismicio/next";

React.useLayoutEffect = React.useEffect;

export function PageLayout({
  locales,
  locale,
  navigation,
  settings,
  sideNav,
  footer,
  page,
  children,
  sliceZone = false,
}) {
  const heroRef = useRef(null);

  const { isMobileSize, isTabletSize, isLaptopSize } = useResponsive();

  const pageRef = useRef(null);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    if (heroRef.current) {
      setHeroHeight(heroRef.current.offsetHeight);
    }
  }, []);

  const [pageHeight, setPageHeight] = useState(0);

  console.log("page height", pageHeight);

  const getDesktopFixedMenuText = (section, locale) => {
    const hash = {
      estimate: {
        "en-au": "Get Estimate",
        "ja-jp": "簡単見積り",
      },
      meeting: {
        "en-au": "Book a Meeting",
        "ja-jp": "気軽に相談",
      },
      phone: {
        "en-au": "03-4577-0045",
        "ja-jp": "03-4577-0045",
      },
      line: {
        "en-au": "Add LINE",
        "ja-jp": "LINEを追加",
      },
    };

    return hash[section][locale];
  };

  useEffect(() => {
    if (pageRef.current) {
      setPageHeight(pageRef.current.offsetHeight);
    }
  }, [pageRef.current?.offsetHeight]);

  useEffect(() => {
    console.log("hero", heroHeight);
  }, [heroHeight]);

  const [isOpen, setOpen] = useState(false);

  console.log("hi im page", page);

  const navbarRef = useRef(null);
  return (
    <div
      ref={pageRef}
      className="flex flex-col justify-between min-h-screen relative"
    >
      <Header
        locales={locales}
        navigation={navigation}
        settings={settings}
        sideNav={sideNav}
        isOpen={isOpen}
        setOpen={setOpen}
        navbarRef={navbarRef}
      />
      <SideNav
        isOpen={isOpen}
        setOpen={setOpen}
        settings={settings}
        sideNav={sideNav}
        locales={locales}
      />
      {/* content starts 80px below the top of the fixed navbar */}
      <main className={clsx("mt-20 flex-1 ")}>
        <Head>
          <title>{prismic.asText(page.data.title)}</title>
          <link rel="preload" href="/Topo-top.svg" as="image" />
        </Head>
        <HeroHeightContext.Provider
          value={{ heroHeight, heroRef, setHeroHeight }}
        >
          <div
            className={clsx(
              isMobileSize() &&
                !isLaptopSize() &&
                pageHeight &&
                pageHeight > 2700 &&
                "bg-woodgrain-top",
              isTabletSize() &&
                pageHeight &&
                pageHeight > 2700 &&
                "bg-woodgrain-top",
              "relative",
              locale === "en-au" && "font-montserrat",
              locale === "en-au" && montserrat.className,
              locale === "ja-jp" && noto.className,
              locale === "ja-jp" && "font-noto"
            )}
            style={{
              backgroundPositionY: `${heroHeight - 300}px`,
            }}
          >
            {sliceZone && (
              <SliceZone slices={page.data.slices} components={components} />
            )}

            {children}
            {!isOpen &&
              isMobileSize() &&
              !isTabletSize() &&
              page?.uid !== "customize" && (
                <div className="fixed flex bottom-0 w-full h-18 z-50">
                  <PrismicNextLink className="flex-1" href="/configurator">
                    <div className="group px-3 py-0 flex items-center bg-[#F1ECE5]">
                      <div className="w-[80px] h-12 flex items-center justify-center">
                        <VanIcon />
                      </div>
                      <div className="w-full ml-5 group-hover:font-semibold text-sm">
                        {getDesktopFixedMenuText("estimate", locale)}
                      </div>
                    </div>
                  </PrismicNextLink>
                  <PrismicNextLink className="flex-1" href="/book-a-meeting">
                    <div className="group px-3 py-0 flex items-center bg-[#F4F2EF]">
                      <div className="flex items-center justify-center w-[80px] h-12">
                        <PeopleIcon />
                      </div>
                      <div className="w-full ml-5 group-hover:font-semibold text-sm">
                        {getDesktopFixedMenuText("meeting", locale)}{" "}
                      </div>
                    </div>
                  </PrismicNextLink>
                </div>
              )}
            {!isMobileSize() && page?.uid !== "customize" && (
              <motion.div
                initial={{
                  translateX: 155,
                }}
                whileHover={{
                  translateX: 12,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="shadow-md fixed top-80 right-0 z-40 cursor-pointer "
              >
                <div className="w-[235px]">
                  <PrismicNextLink href="/configurator">
                    <div className="group px-3 py-2 flex items-center bg-[#F1ECE5]">
                      <div className="w-[80px] h-12 flex items-center justify-center">
                        <VanIcon />
                      </div>
                      <div className="w-full ml-5 group-hover:font-semibold">
                        {getDesktopFixedMenuText("estimate", locale)}
                      </div>
                    </div>
                  </PrismicNextLink>
                  <PrismicNextLink href="/book-a-meeting">
                    <div className="group px-3 py-2 flex items-center bg-[#F4F2EF]">
                      <div className="flex items-center justify-center w-[80px] h-12">
                        <PeopleIcon />
                      </div>
                      <div className="w-full ml-5 group-hover:font-semibold">
                        {getDesktopFixedMenuText("meeting", locale)}{" "}
                      </div>
                    </div>
                  </PrismicNextLink>

                  <PrismicNextLink href="tel:03-4577-0045">
                    <div className="group px-3 py-2 flex items-center bg-[#F1ECE5]">
                      <div className="w-[80px] h-12 flex items-center justify-center">
                        <CallIcon />
                      </div>
                      <div className="w-full ml-5 group-hover:font-semibold">
                        {getDesktopFixedMenuText("phone", locale)}
                      </div>
                    </div>
                  </PrismicNextLink>
                  <PrismicNextLink
                    target="_blank"
                    href="https://page.line.me/dreamdrive"
                  >
                    <div className="group px-3 pt-2 pb-4 flex items-center bg-[#F4F2EF]">
                      <div className="w-[50px] h-12 flex items-center justify-center">
                        <LineIcon />
                      </div>
                      <div className="w-full ml-5 group-hover:font-semibold">
                        {getDesktopFixedMenuText("line", locale)}
                      </div>
                    </div>
                  </PrismicNextLink>
                </div>
              </motion.div>
            )}
          </div>
        </HeroHeightContext.Provider>
        <div className="bg-woodgrain-bottom" />
      </main>
      <Footer footer={footer} settings={settings} />
    </div>
  );
}

const VanIcon = () => {
  return (
    <svg
      width="50"
      height="30"
      viewBox="0 0 50 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.9593 24.4842H47.4995C48.8677 24.4842 48.3743 21.8262 48.3743 21.8262V13.1682C48.3743 11.2729 46.8827 4.27466 46.8827 4.27466H10.7926C10.7926 4.27466 2.44856 11.1159 1.8878 12.8318C1.32705 14.5477 0.699004 17.5084 1.15882 18.3271V23.1384C1.15882 23.1384 1.8878 24.4394 3.18875 24.4394H7.47291"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M33.4258 24.5188H15.291"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M37.7111 28.6898C35.6671 28.6898 34.0102 27.0328 34.0102 24.9888C34.0102 22.9448 35.6671 21.2878 37.7111 21.2878C39.7551 21.2878 41.4121 22.9448 41.4121 24.9888C41.4121 27.0328 39.7551 28.6898 37.7111 28.6898Z"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.3425 28.6898C9.29849 28.6898 7.64151 27.0328 7.64151 24.9888C7.64151 22.9448 9.29849 21.2878 11.3425 21.2878C13.3865 21.2878 15.0435 22.9448 15.0435 24.9888C15.0435 27.0328 13.3865 28.6898 11.3425 28.6898Z"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.4883 5.00415L15.0434 11.6098L2.78532 11.9799"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.3138 5.4405L22.5026 11.6088H34.7271V5.1377"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M48.0972 18.1927H1.45368"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M46.4238 1H18.0833"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.1343 1.52795V3.55788"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M44.6846 1.52795V3.55788"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M37.2632 1.52795V3.55788"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.9761 1.52795V3.55788"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.4531 14.6267L10.7054 14.7052"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.25098 12.4275L5.20797 17.7771"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M47.9293 11.4069H44.9125V21.635H48.3779"
        stroke="#456453"
        strokeWidth="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const PeopleIcon = () => {
  return (
    <svg
      width="40"
      height="36"
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.38706 23.6812H6.89134C2.79513 25.7293 0.258277 29.7208 0.258277 34.1544C0.258277 34.7596 0.78194 35.2832 1.38706 35.2832H23.6951C24.2886 35.2832 24.8239 34.7596 24.8239 34.1544C24.8239 29.7091 22.287 25.7293 18.1908 23.6812C19.308 22.3429 19.9131 20.6905 19.9131 18.9915C19.9131 17.4205 19.4243 15.931 18.4817 14.6509C19.2265 14.1622 20.0178 13.7782 20.844 13.4989C21.2281 13.3709 21.5306 13.0101 21.6004 12.6145C21.6703 12.2188 21.4957 11.7766 21.1582 11.5322C19.7967 10.5547 19.0287 9.04191 19.0287 7.38946C19.0287 4.56168 21.3212 2.26921 24.1489 2.26921C26.9767 2.26921 29.2692 4.56168 29.2692 7.38946C29.2692 9.04191 28.4895 10.5547 27.128 11.5439C26.8022 11.7882 26.6276 12.2188 26.6858 12.6261C26.7556 13.0334 27.0465 13.3825 27.4422 13.5105C31.0729 14.7207 33.6563 17.8162 34.0985 21.4353H21.8099C21.5306 21.4469 21.2397 21.5865 21.0419 21.8076C20.8324 22.0287 20.7277 22.3313 20.7393 22.6106C20.7626 23.2157 21.3212 23.6928 21.903 23.6812H38.8697C39.149 23.6812 39.4399 23.5648 39.6494 23.3437C39.8705 23.1226 39.9985 22.8433 39.9985 22.5524C39.9985 22.2615 39.8705 21.9822 39.6494 21.7611C39.4283 21.54 39.149 21.4236 38.858 21.4236H36.3677C35.9721 17.4671 33.4818 13.9294 29.7812 12.0675C30.8984 10.7409 31.5035 9.07682 31.5035 7.37783C31.5035 3.31653 28.1986 0 24.1257 0C20.0527 0 16.7595 3.30489 16.7595 7.37783C16.7595 9.08846 17.3762 10.7525 18.4934 12.0792C17.8766 12.3817 17.3413 12.6959 16.8526 13.0217C15.5725 12.0908 14.083 11.602 12.5236 11.602C8.46233 11.602 5.15743 14.9069 5.15743 18.9682C5.15743 19.8061 5.29708 20.6323 5.57636 21.412H1.27069C0.991406 21.4236 0.700482 21.5633 0.502654 21.7844C0.293189 22.0055 0.188456 22.308 0.200093 22.5873C0.223367 23.1924 0.781941 23.6696 1.36379 23.6579L1.38706 23.6812ZM15.526 23.1343C15.2001 23.3786 15.0256 23.8092 15.0838 24.2165C15.1536 24.6238 15.4445 24.9729 15.8402 25.1009C19.4476 26.2995 22.031 29.3949 22.4732 33.0257H2.60894C3.05115 29.3949 5.63455 26.2995 9.242 25.1009C9.62602 24.9729 9.92858 24.6122 9.99841 24.2165C10.0682 23.8208 9.89367 23.3786 9.5562 23.1343C8.19468 22.1568 7.42664 20.644 7.42664 18.9915C7.42664 16.1637 9.71912 13.8712 12.5469 13.8712C15.3747 13.8712 17.6672 16.1637 17.6672 18.9915C17.6672 20.644 16.8875 22.1568 15.526 23.1459V23.1343Z"
        fill="#3B6552"
      />
    </svg>
  );
};

const LineIcon = () => {
  return (
    <svg
      width="56"
      height="53"
      viewBox="0 0 56 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.7968 1.74146C42.5937 1.74146 54.5936 11.3504 54.5936 23.2C54.5936 27.3353 53.135 31.1999 50.5936 34.4781C50.4733 34.6585 50.3079 34.869 50.0974 35.0946H50.0824C49.2102 36.1472 48.2478 37.1247 47.1651 38.0119C39.7516 44.8539 27.5562 53.0193 25.9472 51.7561C24.5487 50.6584 28.2479 45.3201 23.9773 44.4179C23.6765 44.3878 23.3758 44.3427 23.0901 44.3126C10.5338 42.5382 1 33.7563 1 23.2C1 11.3504 12.9999 1.74146 27.7968 1.74146Z"
        stroke="#456453"
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.2485 30.042H17.6469C18.4139 30.042 19.0454 29.4104 19.0454 28.6435V28.5232C19.0454 27.7563 18.4139 27.1247 17.6469 27.1247H13.7522V18.2676C13.7522 17.5007 13.1207 16.8691 12.3537 16.8691H12.2334C11.4665 16.8691 10.835 17.5007 10.835 18.2676V28.6285C10.835 29.3954 11.4665 30.0269 12.2334 30.0269L12.2485 30.042ZM45.737 23.5458V23.4255C45.737 22.6586 45.1054 22.027 44.3385 22.027H40.4438V19.8165H44.3385C45.1054 19.8165 45.737 19.1849 45.737 18.418V18.2977C45.737 17.5308 45.1054 16.8992 44.3385 16.8992H38.94C38.1731 16.8992 37.5415 17.5308 37.5415 18.2977V28.6585C37.5415 29.4254 38.1731 30.057 38.94 30.057H44.3385C45.1054 30.057 45.737 29.4254 45.737 28.6585V28.5382C45.737 27.7713 45.1054 27.1397 44.3385 27.1397H40.4438V24.9292H44.3385C45.1054 24.9292 45.737 24.2977 45.737 23.5307V23.5458ZM35.3461 29.6209C35.6017 29.3653 35.7521 29.0044 35.7521 28.6435V18.2827C35.7521 17.5158 35.1205 16.8842 34.3536 16.8842H34.2333C33.4664 16.8842 32.8348 17.5158 32.8348 18.2827V24.3728L27.7822 17.606C27.5416 17.1849 27.0905 16.8992 26.5642 16.8992H26.4439C25.677 16.8992 25.0454 17.5308 25.0454 18.2977V28.6585C25.0454 29.4254 25.677 30.057 26.4439 30.057H26.5642C27.3311 30.057 27.9627 29.4254 27.9627 28.6585V22.4631L33.0453 29.4104C33.0453 29.4104 33.1055 29.5006 33.1506 29.5457C33.2859 29.7412 33.4814 29.8615 33.6919 29.9518C33.8574 30.0119 34.0378 30.057 34.2183 30.057H34.3386C34.5641 30.057 34.7897 29.9969 34.9852 29.8916C35.1205 29.8315 35.2408 29.7412 35.331 29.636L35.3461 29.6209ZM21.5868 30.042H21.7071C22.474 30.042 23.1056 29.4104 23.1056 28.6435V18.2827C23.1056 17.5158 22.474 16.8842 21.7071 16.8842H21.5868C20.8199 16.8842 20.1883 17.5158 20.1883 18.2827V28.6435C20.1883 29.4104 20.8199 30.042 21.5868 30.042Z"
        fill="#456453"
      />
    </svg>
  );
};

const CallIcon = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.6515 36.0031C21.2201 36.0031 14.4325 32.8122 8.77045 27.0724C3.52908 21.7516 0.417611 15.412 0.0158866 9.22241C-0.131918 6.95416 0.758698 4.70898 2.39212 3.20963C3.74889 1.96787 5.13219 1.11439 6.5079 0.679963C8.02385 0.199403 9.69517 0.833743 10.5744 2.22929C12.5224 5.3241 13.7086 8.21515 14.1975 11.0639C14.387 12.1788 14.0383 13.3437 13.2652 14.1856L11.3854 16.2232C11.249 16.3732 11.2339 16.6 11.3475 16.773C12.3329 18.2877 13.4774 19.7102 14.7546 21.0058C16.4335 22.705 18.3019 24.1582 20.3105 25.3231C20.4621 25.4077 20.6592 25.3769 20.7956 25.2501L22.539 23.5931C23.369 22.805 24.5211 22.4513 25.6201 22.6435C28.4284 23.1433 31.2746 24.3428 34.3216 26.315C35.7049 27.2108 36.3303 28.9216 35.8414 30.4786C35.6405 31.1091 35.3601 31.7472 35 32.3739C33.8479 34.3807 31.7483 35.7032 29.3872 35.9224C28.815 35.9762 28.2351 35.9992 27.6553 35.9992L27.6515 36.0031ZM7.52738 2.44458C7.37578 2.44458 7.22419 2.46765 7.07638 2.51378C5.96596 2.86748 4.81763 3.58255 3.66551 4.63594C2.45655 5.74315 1.80091 7.41166 1.91081 9.09554C2.28222 14.82 5.19662 20.7251 10.1158 25.7153C15.8878 31.5704 22.8497 34.596 29.2167 34.0117C30.9676 33.8502 32.5177 32.8775 33.3628 31.4089C33.6546 30.9053 33.8782 30.394 34.0374 29.898C34.2648 29.1714 33.9654 28.3679 33.306 27.9412C30.4749 26.1074 27.8561 24.9963 25.298 24.5427C24.7788 24.4504 24.2368 24.6234 23.8389 25.0002L22.0956 26.6571C21.3565 27.3568 20.2423 27.4952 19.3745 26.9955C17.218 25.746 15.217 24.189 13.4206 22.3667C12.0525 20.9788 10.8283 19.4564 9.77097 17.8341C9.17217 16.9152 9.27071 15.7119 10.0059 14.9122L11.8857 12.8747C12.2571 12.471 12.4239 11.9212 12.3329 11.3984C11.8857 8.80336 10.7904 6.14682 8.97889 3.2673C8.65675 2.75214 8.09206 2.44843 7.52738 2.44843V2.44458Z"
        fill="#3B6552"
      />
      <path
        d="M35.0521 19.2225C34.5291 19.2225 34.1046 18.792 34.1046 18.2614C34.1046 9.2538 26.8774 1.92236 17.9978 1.92236C17.4748 1.92236 17.0503 1.49178 17.0503 0.961243C17.0503 0.430704 17.4748 0.00012207 17.9978 0.00012207C27.9234 0.00012207 35.9996 8.19272 35.9996 18.2614C35.9996 18.792 35.5751 19.2225 35.0521 19.2225Z"
        fill="#3B6552"
      />
      <path
        d="M28.8898 19.2225C28.3668 19.2225 27.9423 18.7919 27.9423 18.2614C27.9423 12.6984 23.4817 8.17346 17.9978 8.17346C17.4748 8.17346 17.0503 7.74288 17.0503 7.21234C17.0503 6.6818 17.4748 6.25122 17.9978 6.25122C24.5239 6.25122 29.8373 11.6373 29.8373 18.2614C29.8373 18.7919 29.4128 19.2225 28.8898 19.2225Z"
        fill="#3B6552"
      />
    </svg>
  );
};
