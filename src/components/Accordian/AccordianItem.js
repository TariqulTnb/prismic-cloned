import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { PrismicRichText } from "@/components/PrismicRichText";
import clsx from "clsx";
import { PrismicNextLink } from "@prismicio/next";

export function AccordianItem({
  title,
  contents,
  children,
  plusIconOnRight = true,
}) {
  return (
    <Disclosure as="div" key={title} className="pt-6 border-t border-[#656565]">
      {({ open }) => (
        <>
          <dt>
            <Disclosure.Button
              className={clsx(
                plusIconOnRight ? "justify-between" : "",
                "flex w-full items-start  text-left text-gray-900"
              )}
            >
              {!plusIconOnRight && <PlusIcon open={open} />}

              <span className={"text-base font-semibold leading-7 ml-2"}>
                <PrismicRichText
                  field={title}
                  components={{
                    paragraph: ({ children }) => (
                      <p className={"text-black font-bold text-[18px]"}>
                        {children}
                      </p>
                    ),
                    heading2: ({ children }) => (
                      <p className=" text-black font-bold text-[18px]">
                        {children}
                      </p>
                    ),
                  }}
                />
              </span>
              {plusIconOnRight && <PlusIcon open={open} />}
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className="mt-4 pr-2">
            {contents && (
              <PrismicRichText
                field={contents}
                components={{
                  paragraph: ({ children }) => (
                    <p
                      className={clsx(
                        !plusIconOnRight && "ml-8",
                        "text-base leading-7 text-[#121212]"
                      )}
                    >
                      {children}
                    </p>
                  ),
                  hyperlink: ({ children, node }) => (
                    <PrismicNextLink
                      field={node.data}
                      className="text-[#2B2B2B] font-bold underline underline-offset-4"
                    >
                      {children}
                    </PrismicNextLink>
                  ),
                }}
              />
            )}
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default AccordianItem;

export const PlusIcon = ({ open }) => {
  return (
    <span className="flex h-7 items-center">
      {open ? (
        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <PlusSmallIcon
          className="h-6 w-6 font-bold text-black stroke-2"
          aria-hidden="true"
        />
      )}
    </span>
  );
};
