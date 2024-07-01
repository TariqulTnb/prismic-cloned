import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bounded } from "./Bounded";
import { Logo } from "./Logo";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import resolveConfig from "tailwindcss/resolveConfig";
import { useWindowSize } from "@uidotdev/usehooks";
import tailwindConfig from "../../tailwind.config.js";
import clsx from "clsx";
import { LangSwitcher } from "./LangSwitcher";
import { montserrat, noto } from "@/lib/fonts";
export function SideNav({ isOpen, setOpen, settings, sideNav, locales = [] }) {
  const size = useWindowSize();
  const fullConfig = resolveConfig(tailwindConfig);
  const { screens } = fullConfig.theme;

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      className={`${montserrat.className} ${noto.className} relative z-40 font-noto`}
    >
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <nav className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full laptop:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full laptop:translate-x-full laptop:translate-y-0"
                enterTo={`translate-y-[80px] laptop:translate-y-0 laptop:translate-x-0`}
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom={`translate-y-[80px] laptop:translate-y-0 laptop:translate-x-0`}
                leaveTo="translate-y-full laptop:translate-x-full laptop:translate-y-0"
              >
                <Dialog.Panel
                  className={"pointer-events-auto w-screen laptop:max-w-sm"}
                >
                  <div className="safe-area-inset-bottom flex h-full flex-col overflow-scroll bg-white shadow-xl side-nav">
                    {size.width > parseInt(screens.laptop) && (
                      <DesktopSideMenuContent
                        {...{ settings, sideNav, setOpen }}
                      />
                    )}
                    {size.width <= parseInt(screens.laptop) && (
                      <TabletSideMenuContent
                        {...{ sideNav, setOpen, locales }}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </nav>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function TabletSideMenuContent({ sideNav, setOpen, locales = [] }) {
  return (
    <>
      <div className="h-32 w-full grid grid-cols-2 tablet:grid-cols-4">
        {sideNav.data?.tablet_top_links.map((item, idx) => {
          return (
            <TabletTopMenuButton
              key={`tablet_top_link_${idx}`}
              {...{ item, idx, setOpen }}
            />
          );
        })}
      </div>
      <Bounded xPadding="lg" yPadding="xs" className="py-4 md:py-6">
        <TabletMenuLinkRow
          setOpen={setOpen}
          label={sideNav.data?.line_up_label}
          link={sideNav.data?.line_up_link}
          sideNav={sideNav}
          arrowDown={true}
          border={false}
          className="mb-2"
        />
        <div className="w-full flex justify-evenly gap-x-0 my-3 tablet:my-4">
          {sideNav?.data?.tablet_line_up_links.map((item, idx) => {
            return (
              <div className="" key={`line_up_link_image_${idx}`}>
                <CloseablePrismicNextLink
                  setOpen={setOpen}
                  className="flex flex-col items-center justify-start h-20 laptop:h-24"
                  field={item.link}
                >
                  <PrismicNextImage field={item.icon} />
                </CloseablePrismicNextLink>
                <CloseablePrismicNextLink
                  setOpen={setOpen}
                  className="mt-2 text-sm tablet:text-lg font-bold flex flex-col items-center justify-start"
                  field={item.link}
                >
                  <PrismicText field={item.label} />
                </CloseablePrismicNextLink>
                <CloseablePrismicNextLink
                  setOpen={setOpen}
                  className="mt-1 flex text-sm tablet:text-lg flex-col items-center justify-start"
                  field={item.nested_link}
                >
                  <PrismicText field={item.nested_label} />
                </CloseablePrismicNextLink>
              </div>
            );
          })}
        </div>
        {sideNav?.data?.tablet_links.map((item, idx) => {
          return (
            <div
              className="border-b border-[#CFCFCF] py-3 tablet:py-4"
              key={`tablet_side_menu_link_${idx}`}
            >
              <CloseablePrismicNextLink
                setOpen={setOpen}
                className="text-sm tablet:text-lg font-bold"
                field={item.link}
              >
                <div className="flex justify-between items-center">
                  <span>
                    <PrismicText className="font-sans" field={item.label} />
                  </span>
                  <PrismicNextImage
                    field={sideNav.data.tablet_arrow_icon}
                    className="h-3 tablet:h-4 flex items-center justify-center"
                  />
                </div>
              </CloseablePrismicNextLink>
            </div>
          );
        })}
        <div className="mt-4">
          <LangSwitcher
            showCurrent={true}
            locales={locales}
            setOpen={setOpen}
          />
        </div>
      </Bounded>
    </>
  );
}

function TabletMenuLinkRow({ label, link, border = true, className, setOpen }) {
  return (
    <div
      className={clsx(
        border && "border-t",
        "w-full flex flex-row justify-between",
        className
      )}
    >
      <div>
        <CloseablePrismicNextLink
          setOpen={setOpen}
          className="font-semibold text-sm tablet:text-lg"
          field={link}
        >
          {label}
        </CloseablePrismicNextLink>
      </div>
      <CloseablePrismicNextLink
        setOpen={setOpen}
        className="font-semibold text-sm tablet:text-lg"
        field={link}
      ></CloseablePrismicNextLink>
    </div>
  );
}

function TabletTopMenuButton({ item, idx, setOpen }) {
  return (
    <CloseablePrismicNextLink
      setOpen={setOpen}
      field={item.link}
      className={clsx(
        idx % 2 ? "tablet:bg-menuBeigeLight" : "tablet:bg-menuBeigeDark",
        idx === 0 || idx === 3 ? "bg-menuBeigeLight" : "bg-menuBeigeDark",
        `py-2 w-full flex justify-center items-center text-gray-900 font-semibold text-xs tablet:text-base flex-col tablet:justify-center gap-3  relative`
      )}
    >
      <PrismicNextImage
        field={item.icon}
        height={35}
        className="h-5 tablet:h-10"
      />
      <PrismicText field={item.label} />
    </CloseablePrismicNextLink>
  );
}

function DesktopSideMenuContent({ settings, sideNav, setOpen }) {
  return (
    <>
      <Bounded
        className="hidden laptop:block h-full py-4 pl-8 pr-6"
        as="div"
        yPadding="none"
        xPadding="none"
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex items-start justify-between pt-3 pr-3 ">
            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
              <Logo settings={settings} />
            </Dialog.Title>
            <div className="hidden ml-3 laptop:flex h-7 items-center">
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <XMarkIcon
                  className="h-8 w-8 text-gray-900 stroke-2"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          <div className="relative flex-1">
            {/* Your content */}
            <div className="hidden laptop:block">
              <SideNavSubList
                setOpen={setOpen}
                mainLabel={sideNav.data?.line_up_label}
                mainLink={sideNav.data?.line_up_link}
                childLinks={sideNav.data?.line_up_child_links}
              />
              <SideNavSubList
                setOpen={setOpen}
                mainLabel={sideNav.data?.schedule_label}
                mainLink={sideNav.data?.schedule_link}
                childLinks={sideNav.data?.schedule_child_links}
              />
              <SideNavSubList
                setOpen={setOpen}
                mainLabel={sideNav.data?.guide_label}
                mainLink={sideNav.data?.guide_link}
                childLinks={sideNav.data?.guide_child_links}
              />
              <SideNavSubList
                setOpen={setOpen}
                mainLabel={sideNav.data?.community_label}
                mainLink={sideNav.data?.community_link}
                childLinks={sideNav.data?.community_child_links}
              />
              <SideNavSubList
                setOpen={setOpen}
                mainLabel={sideNav.data?.about_label}
                mainLink={sideNav.data?.about_link}
                childLinks={sideNav.data?.about_child_links}
              />
              <SideNavSubList
                setOpen={setOpen}
                mainLabel={sideNav.data?.contact_label}
                mainLink={sideNav.data?.contact_link}
                childLinks={sideNav.data?.contact_child_links}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <PrismicNextImage width={202} field={sideNav.data?.campervans} />
          </div>
        </div>
      </Bounded>
    </>
  );
}

function SideNavSubList({ mainLabel, mainLink, childLinks = [], setOpen }) {
  if (!mainLabel || !mainLink) {
    return null;
  }

  function getFontClass(character) {
    // Check if the character is within the Unicode English range
    if (character >= "\u0020" && character <= "\u007E") {
      return "font-montserrat"; // Apply "font-montserrat" class for English characters
    } else {
      return "";
    }
  }

  return (
    <div className="mt-5">
      <ul className="leading-loose">
        <li className="font-bold">
          <CloseablePrismicNextLink setOpen={setOpen} field={mainLink}>
            {mainLabel}
          </CloseablePrismicNextLink>
        </li>
        {childLinks.map((item, idx) => {
          return (
            <li className="" key={`${item[item.child_label]}_${idx}`}>
              <CloseablePrismicNextLink
                setOpen={setOpen}
                className={clsx(getFontClass(item.child_label[0]))}
                field={item.child_link}
              >
                <PrismicText field={item.child_label} />
              </CloseablePrismicNextLink>
              {item.nested_child_label?.length > 0 ? (
                <>
                  <Divider />
                  <CloseablePrismicNextLink
                    setOpen={setOpen}
                    field={item.nested_child_link}
                  >
                    <PrismicText field={item.nested_child_label} />
                  </CloseablePrismicNextLink>
                </>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Divider() {
  return <div className="mx-3 inline font-medium text-gray-600">&gt;</div>;
}

function CloseablePrismicNextLink({ setOpen, ...props }) {
  return <PrismicNextLink {...props} onClick={() => setOpen(false)} />;
}
