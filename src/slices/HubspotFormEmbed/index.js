import { useEffect, useRef } from "react";
import * as prismic from "@prismicio/client";
import { useRouter } from "next/router";

/**
 * @typedef {import("@prismicio/client").Content.HubspotFormEmbedSlice} HubspotFormEmbedSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HubspotFormEmbedSlice>} HubspotFormEmbedProps
 * @param {HubspotFormEmbedProps}
 */
const HubspotFormEmbed = ({ slice }) => {
  const initialized = useRef(false);

  const { locale } = useRouter(); // Get the current locale

  useEffect(() => {
    console.log("running effect", initialized.current);
    const targetElement = document.getElementById("targetElement");
    if (!targetElement) {
      console.error("Target element not found.");
      return;
    }

    // Cleanup any existing scripts in the target element
    Array.from(targetElement.getElementsByTagName("script")).forEach(
      (script) => {
        script.parentNode.removeChild(script);
      }
    );

    targetElement.innerHTML = "";

    let externalScript, inlineScript;

    if (prismic.isFilled.richText(slice.primary.content)) {
      externalScript = document.createElement("script");
      externalScript.type = "text/javascript";

      if (prismic.isFilled.richText(slice.primary.content)) {
        externalScript.src = "//js.hsforms.net/forms/embed/v2.js";
        externalScript.async = true;

        externalScript.onload = () => {
          targetElement.innerHTML = "";
          console.log("External script loaded.");
          inlineScript = document.createElement("script");
          inlineScript.type = "text/javascript";
          inlineScript.text = slice.primary.content[0].text;
          targetElement.appendChild(inlineScript);
        };
      }

      targetElement.appendChild(externalScript);
    }

    return () => {
      // Cleanup on unmount or before re-render
      console.log("cleaning up effect");
      if (externalScript && externalScript.parentNode) {
        externalScript.parentNode.removeChild(externalScript);
      }
      if (inlineScript && inlineScript.parentNode) {
        inlineScript.parentNode.removeChild(inlineScript);
      }
    };
  }, [locale]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container"
    >
      <div id="targetElement" className="mx-auto max-w-3xl"></div>
    </section>
  );
};

export default HubspotFormEmbed;
