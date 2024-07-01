import { getLocales } from "@/lib/getLocales";
import { createClient } from "@/prismicio";
import { PageLayout } from "@/components/PageLayout";
import { useRouter } from "next/router";

export default function Page({
  page,
  navigation,
  settings,
  locales,
  sideNav,
  footer,
}) {
  const router = useRouter();
  return (
    <PageLayout
      locales={locales}
      navigation={navigation}
      settings={settings}
      sideNav={sideNav}
      footer={footer}
      page={page}
      sliceZone={true}
      locale={router.locale}
    />
  );
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const uid = params.uid[params.uid.length - 1];

  let page;

  // need to make sure length is greater than 1 because of the models page
  if (params.uid.length > 1 && params.uid[0] === "models") {
    page = await client.getByUID("van_model", uid, { lang: locale });
  } else if (params.uid.length > 1 && params.uid[0] === "interview") {
    page = await client.getByUID("career_interview", uid, { lang: locale });
  } else {
    page = await client.getByUID("page", uid, { lang: locale });
  }

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const sideNav = await client.getSingle("side_navigation", { lang: locale });
  const footer = await client.getSingle("footer", { lang: locale });

  const locales = await getLocales(page, client);

  return {
    props: {
      params,
      page,
      navigation,
      settings,
      locales,
      sideNav,
      footer,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page", { lang: "*" });
  const models = await client.getAllByType("van_model", { lang: "*" });
  const interviews = await client.getAllByType("career_interview", {
    lang: "*",
  });

  const pagePaths = pages.map((page) => {
    return {
      params: { uid: [page.uid] },
      locale: page.lang,
    };
  });

  const modelPaths = models.map((page) => {
    return {
      params: { uid: ["models", page.uid] },
      locale: page.lang,
    };
  });

  const interviewPaths = interviews.map((page) => {
    return {
      params: { uid: ["interview", page.uid] },
      locale: page.lang,
    };
  });

  return {
    paths: [...pagePaths, ...modelPaths, ...interviewPaths],
    fallback: false,
  };
}
