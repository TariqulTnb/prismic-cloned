import { createClient } from "@/prismicio";
import { PageLayout } from "@/components/PageLayout";
import { useState, useEffect } from "react";
import SketchFabProvider from "@/hooks/useSketchfab";
import { useRouter } from "next/router";
import { Viewer } from "@/configurator/components/Viewer";
import { ModelCardWithImageLogoAndIcons } from "@/slices/ModelCard/components/ModelCardWithImageLogoAndIcons";
import { useSearchParams } from "next/navigation";

export default function Configurator({
  locales,
  indexPage,
  pages,
  configDatas,
  navigation,
  settings,
  sideNav,
  footer,
  additionalPackages,
}) {
  const router = useRouter();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const [page, setPage] = useState(null);
  const [comparisonPage, setComparisonPage] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [comparisonConfigData, setComparisonConfigData] = useState(null);

  console.log("configurator re-render!");
  console.log("config data in configurator", configData);

  const searchParams = useSearchParams();

  const model = searchParams.get("model");

  console.log("model is now", model);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.0.js";
    script.async = true;

    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => console.error("Script failed to load");

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    console.log("model changed to", model);
  }, [model]);

  console.log("search params are", model);

  console.log("index page", indexPage);
  console.log("pages are", pages);

  console.log("config datas are", configDatas);

  console.log("router asPath", router.asPath, router.query.step);

  const [currentStep, setCurrentStep] = useState([]);

  useEffect(() => {
    if (currentStep.length > 0) {
      const pageIndexToSet = pages.findIndex(
        (page) => page.uid === currentStep[0]
      );
      const comparisonPageIndexToSet = pages.findIndex(
        (page) => page.uid !== currentStep[0]
      );
      const configDataIndexToSet = configDatas.findIndex(
        (configData) => configData.uid === currentStep[0]
      );
      const comparisonConfigDataIndexToSet = configDatas.findIndex(
        (configData) => configData.uid !== currentStep[0]
      );
      setPage(pages[pageIndexToSet]);
      setComparisonPage(pages[comparisonPageIndexToSet]);
      setConfigData(configDatas[configDataIndexToSet]);
      setComparisonConfigData(configDatas[comparisonConfigDataIndexToSet]);
    }
  }, [currentStep, currentStep[0]]);

  useEffect(() => {
    if (searchParams.has("model") && currentStep.length === 0) {
      const model = searchParams.get("model");
      if (model === "kumaq") {
        setCurrentStep(["kumaq", "base_config"]);
      } else if (model === "tama") {
        setCurrentStep(["tama", "base_config"]);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentStep]);

  console.log("page is", page, "and config data is", configData);

  if (!isScriptLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <SketchFabProvider>
      <PageLayout
        page={indexPage}
        locales={locales}
        navigation={navigation}
        settings={settings}
        sideNav={sideNav}
        footer={footer}
        locale={router.locale}
      >
        <div className="max-w-[1600px] mx-auto">
          {!page && !configData && (
            <ModelCardWithImageLogoAndIcons
              slice={indexPage.data.slices[0]}
              setCurrentStep={setCurrentStep}
            />
          )}
          {page && configData && (
            <Viewer
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              configData={configData}
              page={page}
              comparisonPage={comparisonPage}
              comparisonConfigData={comparisonConfigData}
              slices={page.data.slices}
              packages={additionalPackages}
            />
          )}
        </div>
      </PageLayout>
    </SketchFabProvider>
  );
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  console.log("get static props locale", locale);

  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });
  const sideNav = await client.getSingle("side_navigation", { lang: locale });
  const footer = await client.getSingle("footer", { lang: locale });
  const additionalPackages = await client.getByUID(
    "options_package",
    "additional-packages",
    {
      lang: locale,
    }
  );
  // const uid = params.uid[params.uid.length - 1];

  const indexPage = await client.getByUID("page", "customize", {
    lang: locale,
  });

  const configDatas = await client.getAllByType("configurator_options", {
    lang: locale,
  });

  const pages = await client.getAllByType("configurator_page", {
    lang: locale,
  });

  console.log("pages are server", pages);

  // const page = await client.getByUID("configurator_page", uid, {
  //   lang: locale,
  // });

  return {
    props: {
      navigation,
      settings,
      sideNav,
      footer,
      indexPage,
      // configData,
      additionalPackages,
      locale,
      // page,
      pages,
      configDatas,
    },
  };
}

// export async function getStaticPaths() {
//   const client = createClient();

//   const pages = await client.getAllByType("configurator_page", { lang: "*" });

//   const pagePaths = pages.map((page) => {
//     return {
//       params: { uid: [page.uid] },
//       locale: page.lang,
//     };
//   });

//   return {
//     paths: pagePaths,
//     fallback: false,
//   };
// }
