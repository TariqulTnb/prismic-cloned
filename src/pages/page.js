import Head from "next/head";
import { isFilled, asLink } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import { createClient } from "@/prismicio";

export default function Page({ page }) {
  return (
    <>
      <Head>
        <title>{page.data.meta_title}</title>
        {isFilled.keyText(page.data.meta_description) ? (
          <meta name="description" content={page.data.meta_description} />
        ) : null}
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

export async function getStaticProps({ params, previewData }) {
  // The `previewData` parameter allows your app to preview
  // drafts from the Page Builder.
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid);

  return {
    props: { page },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => {
      return asLink(page);
    }),
    fallback: false,
  };
}
