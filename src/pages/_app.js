import "@/styles/globals.css";

import { PrismicPreview } from "@prismicio/next";
import { montserrat, noto } from "@/lib/fonts";
import { repositoryName } from "@/prismicio";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import clsx from "clsx";

console.log("noto variable", noto.variable);

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        gcTime: Infinity,
        cacheTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  return (
    <main
      className={clsx(
        pageProps.locale === "en-au" ? montserrat.className : noto.className
      )}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Component {...pageProps} />
        <PrismicPreview repositoryName={repositoryName} />
      </QueryClientProvider>
    </main>
  );
}
