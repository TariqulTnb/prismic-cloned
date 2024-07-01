import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { useRouter } from "next/router";
const localeLabels = {
  "en-au": "English",
  "ja-jp": "日本語",
};
export function LangSwitcher({ locales = [], showCurrent = false, setOpen }) {
  const router = useRouter();
  const currentLocale = router.locale;

  const localesToUse = () => {
    return showCurrent
      ? locales
      : locales.filter((locale) => locale.lang !== currentLocale);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <span aria-hidden={true}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-ddGreen stroke-1.5"
        >
          <path
            strokeLinecap="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      </span>
      <ul className="flex flex-wrap gap-3 items-center">
        {localesToUse().map((locale) => (
          <li
            key={locale.lang}
            className={clsx(
              currentLocale === locale.lang && "font-bold",
              "align-middle"
            )}
          >
            <PrismicNextLink
              href={locale.url}
              locale={locale.lang}
              aria-label={`Change language to ${locale.lang_name}`}
              onClick={setOpen ? () => setOpen(false) : undefined}
            >
              {localeLabels[locale.lang] || locale.lang}
            </PrismicNextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
