import { useRef, useEffect, useState } from "react";
import { useSketchFab } from "@/hooks/useSketchfab";
import { clsx } from "clsx";
import { useQueryClient } from "@tanstack/react-query";

import { parseArrayString } from "./lib";
import { ChooseInterior } from "./components/ChooseInterior";
import { ChooseBase } from "@/configurator/components/Viewer/components/ChooseBase";
import { Preview } from "./components/Preview";
import { ChooseExterior } from "./components/ChooseExterior";
import { ChooseTyres } from "./components/ChooseTyres";
import { ChooseMaterials } from "./components/ChooseMaterials";
import BounceLoader from "react-spinners/BounceLoader";
import { PrismicRichText } from "@/components/PrismicRichText";
import { useResponsive } from "@/hooks/useResponsive";
import { SummaryPage } from "./components/SummaryPage";

export const Viewer = ({
  slices,
  configData,
  packages,
  page,
  currentStep,
  setCurrentStep,
  comparisonConfigData,
  comparisonPage,
}) => {
  const ref = useRef(null);

  console.log("packages are", packages);

  console.log("slices are this", slices);

  const findStep = (step) => {
    return slices.find((slice) => {
      if (slice.primary.type) {
        return slice.primary.type === step;
      }
    });
  };

  console.log("comparison config data", comparisonConfigData);
  console.log("comparison page", comparisonPage);

  const { data } = configData;

  console.log("whats page", page);

  const { isLaptopSize } = useResponsive();

  console.log("current step", currentStep);

  console.log("config data", data);
  console.log("slices", slices);

  const ceilings = findStep("ceilings").items;
  const floors = findStep("floors").items;
  const seats = findStep("seats").items;
  const cabinets = findStep("cabinets").items;
  const walls = findStep("walls").items;

  const textures = ceilings.concat(floors, seats, cabinets, walls);

  console.log("textures are here", textures);

  const iframeRenderedRef = useRef(false);

  const modes = data.slices.filter(
    (slice) => slice.slice_type === "preview_mode"
  );

  const summarySlice = slices.find(
    (slice) => slice.slice_type === "summary_form"
  );
  const defaults = slices.find(
    (slice) => slice.slice_type === "default_options"
  );

  const compareSlice = slices.find(
    (slice) => slice.slice_type === "summary_comparison"
  );

  const menuSlice = slices.find((slice) => slice.slice_type === "menu_links");

  const queryClient = useQueryClient();
  const {
    initSketchfabViewer,
    setCameraLookAt,
    apiInstance,
    toggleNodes,
    viewerReady,
    removeAllAnnotations,
    setUserInteraction,
    readyForAction,
  } = useSketchFab();

  const currentStepSlice = slices.find((slice) => {
    if (slice.primary.type) {
      return currentStep.includes(slice.primary.type);
    }
  });

  const performanceSlice = slices.find(
    (slice) => slice.slice_type === "performance_text"
  );

  const baseSlice = slices.find((slice) => slice.slice_type === "base_options");

  console.log("page data", page.data);

  const viewerStep = () => {
    return (
      !currentStep.includes("base_config") ||
      !currentStep.includes("summary") ||
      !currentStep.includes("compare")
    );
  };

  useEffect(() => {
    // close doors if exterior step
    if (
      currentStep.includes("exterior") ||
      currentStep.includes("interior") ||
      (currentStep.includes("tyres") && viewerReady)
    ) {
      const hideNodes = data.doors_closed_hide_nodes.map((node) => node.name);
      const showNodes = data.doors_closed_show_nodes.map((node) => node.name);
      toggleNodes(hideNodes, false);
      toggleNodes(showNodes, true);
    }

    // open doors if another option step
    if (
      !currentStep.includes("exterior") &&
      !currentStep.includes("interior") &&
      !currentStep.includes("tyres") &&
      viewerReady &&
      viewerStep()
    ) {
      const hideNodes = data.doors_open_hide_nodes.map((node) => node.name);
      const showNodes = data.doors_open_show_nodes.map((node) => node.name);
      toggleNodes(hideNodes, false);
      toggleNodes(showNodes, true);
    }

    // show sides of van if not preview step
    if (
      !currentStep.includes("preview") &&
      viewerStep() &&
      viewerReady &&
      currentStepSlice?.primary?.show_nodes
    ) {
      const showNodes = parseArrayString(currentStepSlice.primary.show_nodes);
      toggleNodes(showNodes, true);
      removeAllAnnotations();
    }

    // put nodes into driving mode if not preview step
    if (
      !currentStep.includes("preview") &&
      viewerStep() &&
      viewerReady &&
      modes
    ) {
      const drivingModeHideNodes = parseArrayString(
        modes[1].primary.hide_nodes
      );
      const drivingModeShowNodes = parseArrayString(
        modes[1].primary.show_nodes
      );
      toggleNodes(drivingModeHideNodes, false);
      toggleNodes(drivingModeShowNodes, true);
      setUserInteraction(false);
    }
  }, [currentStep]);

  useEffect(() => {
    if (ref.current && !iframeRenderedRef.current) {
      // this... inits the model
      initSketchfabViewer({
        iframeRef: ref,
        model: page.data.model,
        modelId: page.data.sketchfab_id,
        textures: textures,
        queryClient: queryClient,
        nodesToShow: data.default_mode_show_nodes.concat(
          data.doors_open_show_nodes
        ),
        nodesToHide: data.default_mode_hide_nodes.concat(
          data.doors_open_hide_nodes
        ),
        cameraPosition: page.data.starting_camera_position,
        startingWrapColor: parseArrayString(page.data.starting_wrap_colour),
      });
      iframeRenderedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      console.log("currentStepSlice", currentStepSlice);
      if (
        currentStepSlice &&
        apiInstance &&
        currentStepSlice.primary.camera_look_at
      ) {
        const cameraLookAt = JSON.parse(
          currentStepSlice.primary.camera_look_at
        );
        setCameraLookAt(cameraLookAt);
      }
    }
  }, [currentStep]);

  const materialStep = () => {
    return (
      currentStep.includes("ceilings") ||
      currentStep.includes("floors") ||
      currentStep.includes("seats") ||
      currentStep.includes("cabinets") ||
      currentStep.includes("walls")
    );
  };
  console.log("material step is", materialStep());

  const [summaryStep, setSummaryStep] = useState([page.data.model, "form"]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [summaryStep]);

  return (
    <>
      <div className="relative">
        <iframe
          className={clsx("w-full h-[400px] tablet:h-[500px]", {
            hidden:
              currentStep.includes("base_config") ||
              currentStep.includes("summary") ||
              currentStep.includes("compare") ||
              !readyForAction,
          })}
          ref={ref}
        ></iframe>
        {/* Configurator Menu */}
        <div
          className={clsx(
            "absolute flex tablet:justify-center items-center h-16 bottom-0 w-full overflow-x-scroll no-scrollbar",
            {
              hidden:
                currentStep.includes("base_config") ||
                currentStep.includes("summary") ||
                currentStep.includes("compare") ||
                !readyForAction,
            }
          )}
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          {menuSlice &&
            menuSlice.items.map((item, idx) => {
              // return this definitely if hte index is not the last one
              // if the index is the last one, we only want to return it if the form has been submitted
              if (
                idx !== menuSlice.items.length - 1 ||
                summaryStep.includes("compare")
              ) {
                return (
                  <div key={idx} className="">
                    <div
                      id={item.link_name}
                      className="cursor-pointer mx-4 "
                      onClick={() => {
                        setCurrentStep([page.data.model, item.link_name]);
                        const element = document.getElementById(item.link_name);
                        if (element && !isLaptopSize()) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "center",
                          });
                        }
                      }}
                    >
                      <PrismicRichText
                        field={item.text}
                        components={{
                          paragraph: ({ children }) => (
                            <p
                              className={clsx(
                                "text-white text-[16px] break-keep break-normal",
                                currentStep.includes(item.link_name) &&
                                  "font-semibold"
                              )}
                            >
                              {children}
                            </p>
                          ),
                        }}
                      />
                    </div>
                    {/* for menu arrows > */}
                    {/* {idx !== menuSlice.items.length - 1 && (
                    <div className="text-[16px] font-medium text-white">
                      {" > "}
                    </div>
                  )} */}
                  </div>
                );
              }
            })}
        </div>
      </div>
      {!readyForAction && !currentStep.includes("base_config") && (
        <div className="flex flex-col justify-center items-center h-96">
          <BounceLoader loading={true} color={"#3B6552"} size={100} />
          <div className="mt-4 font-montserrat">Loading</div>
        </div>
      )}
      {currentStep.includes("base_config") && (
        <ChooseBase
          slices={slices}
          performanceSlice={performanceSlice}
          baseSlice={baseSlice}
          model={page.data.model}
          setCurrentStep={setCurrentStep}
        />
      )}
      {materialStep() && readyForAction && currentStepSlice && (
        <ChooseMaterials
          slice={currentStepSlice}
          currentStep={currentStep}
          setCurrentStep={() =>
            setCurrentStep([
              page.data.model,
              currentStepSlice.primary.next_step_link,
            ])
          }
        />
      )}
      {currentStep.includes("exterior") && currentStepSlice && (
        <ChooseExterior
          slice={currentStepSlice}
          setCurrentStep={() =>
            setCurrentStep([
              page.data.model,
              currentStepSlice.primary.next_step_link,
            ])
          }
        />
      )}
      {currentStep.includes("tyres") && currentStepSlice && (
        <ChooseTyres
          slice={currentStepSlice}
          setCurrentStep={() =>
            setCurrentStep([
              page.data.model,
              currentStepSlice.primary.next_step_link,
            ])
          }
        />
      )}
      {currentStep.includes("interior") && currentStepSlice && (
        <ChooseInterior
          packages={packages}
          slice={currentStepSlice}
          queryClient={queryClient}
          exteriorOptionsSlice={findStep("exterior-options")}
          optionalItemsSlice={findStep("optional-items")}
          setCurrentStep={() =>
            setCurrentStep([
              page.data.model,
              currentStepSlice.primary.next_step_link,
            ])
          }
        />
      )}
      {currentStep.includes("preview") && currentStepSlice && (
        <Preview
          slice={currentStepSlice}
          modes={modes}
          setCurrentStep={() =>
            setCurrentStep([
              page.data.model,
              currentStepSlice.primary.next_step_link,
            ])
          }
        />
      )}
      {currentStep.includes("summary") && summarySlice && (
        <SummaryPage
          compareSlice={compareSlice}
          formSlice={summarySlice}
          pageData={page}
          defaultOptions={defaults}
          packages={packages}
          comparisonPage={comparisonPage}
          summaryStep={summaryStep}
          setSummaryStep={setSummaryStep}
          setCurrentStep={setCurrentStep}
        />
      )}
      {/* for dev debugging */}
      {/* {viewerReady && (
        <button onClick={() => getCameraLookAt()}>Get camera</button>
      )}
      {viewerReady && (
        <button onClick={() => setSummaryStep([page.data.model, "compare"])}>
          to summary
        </button>
      )} */}
    </>
  );
};
