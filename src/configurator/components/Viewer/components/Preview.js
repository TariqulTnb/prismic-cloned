import { useEffect, useState, useRef } from "react";
import { clsx } from "clsx";
import { PrismicRichText } from "@/components/PrismicRichText";
import { useSketchFab } from "@/hooks/useSketchfab";
import { parseArrayString } from "@/configurator/components/Viewer/lib";
import { Button } from "@/components/Common/Button";

export const Preview = ({ modes, slice, setCurrentStep }) => {
  const [previewMode, setPreviewMode] = useState([true, false, false]);
  const annotationIndexesRef = useRef([[], [], []]);

  console.log("modes are", modes);

  console.log("slice", slice);

  console.log("preview mode", previewMode);

  const {
    toggleNodes,
    createAnnotation,
    showAnnotation,
    hideAnnotation,
    removeAnnotation,
    gotoAnnotation,
    setUserInteraction,
  } = useSketchFab();

  const changeMode = async (idx) => {
    console.log(
      "running change mode with idx",
      idx,
      "annotations",
      annotationIndexesRef.current
    );
    const hideNodes = parseArrayString(modes[idx].primary.hide_nodes);
    const showNodes = parseArrayString(modes[idx].primary.show_nodes);

    await toggleNodes(hideNodes, false);
    await toggleNodes(showNodes, true);

    setPreviewMode(() => {
      const newState = [false, false, false];
      newState[idx] = true;
      return newState;
    });

    const otherIndexes = [0, 1, 2].filter((item) => item !== idx);

    console.log("other indexes are", otherIndexes);

    const hideResults = otherIndexes.flatMap((index) => {
      return annotationIndexesRef.current[index].map((annotation) => {
        return hideAnnotation(annotation);
      });
    });

    await Promise.all(hideResults);

    console.log("annotations hide results", hideResults);

    if (
      annotationIndexesRef.current[idx] ||
      annotationIndexesRef.current[idx] === 0
    ) {
      const showResults = annotationIndexesRef.current[idx].map(
        (annotation) => {
          return showAnnotation(annotation);
        }
      );
      await Promise.all(showResults);
      await gotoAnnotation(annotationIndexesRef.current[idx][0]);
      await setUserInteraction(true);
    }
  };

  const createAnnotations = async () => {
    const indexes = [0, 1, 2];

    for (const idx of indexes) {
      const items = modes[idx].items;

      for (const item of items) {
        console.log("creating annotation with item", item);
        let result = await createAnnotation(
          JSON.parse(item.scene_position),
          JSON.parse(item.camera),
          item.title,
          item.main_text
        );

        if (result || result === 0) {
          console.log(
            "pushing annotation",
            result,
            "to index",
            idx,
            annotationIndexesRef.current
          );
          annotationIndexesRef.current[idx].push(result);
        } else {
          console.log("annotation result is", result, "for index", idx);
        }
      }

      console.log(
        "ref after creating annotations",
        annotationIndexesRef.current
      );
    }
  };

  const setupRunRef = useRef(false);

  useEffect(() => {
    const setUpSleepingMode = async () => {
      await createAnnotations();

      await changeMode(0);
    };

    const hideNodes = async () => {
      const hideNodes = parseArrayString(slice.primary.hide_nodes);
      const showNodes = parseArrayString(slice.primary.show_nodes);

      await toggleNodes(hideNodes, false);
      await toggleNodes(showNodes, true);
    };

    if (!setupRunRef.current) {
      setUpSleepingMode();
      hideNodes();
      setupRunRef.current = true;
    }

    return () => {
      if (annotationIndexesRef.current[0]?.length > 0) {
        console.log("removing indexes", annotationIndexesRef.current.flat());
        const promises = annotationIndexesRef.current
          .flat()
          .map((annotation) => {
            return removeAnnotation(annotation);
          });

        Promise.all(promises).then((result) => {
          console.log("all annotations removed", result);
          annotationIndexesRef.current = [[], [], []];
        });
      }
    };
  }, []);

  const chooseSVG = (idx) => {
    console.log("preview mode at index", previewMode[idx]);
    if (idx === 0) {
      return <SleepingModeSVG selected={previewMode[idx]} />;
    } else if (idx === 1) {
      return <DiningModeSVG selected={previewMode[idx]} />;
    } else if (idx === 2) {
      return <DrivingModeSVG selected={previewMode[idx]} />;
    }
  };

  return (
    <div className="padded-container">
      <div className="mt-8">
        <PrismicRichText
          field={slice.primary.instruction}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-black mb-8 text-center">{children}</h2>
            ),
            paragraph: ({ children }) => (
              <div className="flex justify-center w-full ">
                <p className="text-black my-2 max-w-[570px] text-[1rem]">
                  {children}
                </p>
              </div>
            ),
          }}
        />
      </div>
      <div className="flex mt-4 overflow-scroll w-full tablet:justify-center">
        {modes.map((mode, idx) => {
          return (
            <div
              key={idx}
              className={clsx("text-center flex flex-col items-center mr-4")}
            >
              <div
                className={clsx(
                  previewMode[idx] ? "bg-ddGreen" : "bg-menuBeigeDark",
                  "relative flex flex-col justify-center items-center text-center shrink-0 cursor-pointer w-[180px] h-[120px] rounded-md my-1"
                )}
                onClick={() => changeMode(idx)}
              >
                {chooseSVG(idx)}
              </div>
              <PrismicRichText
                field={mode.primary.title}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-black text-[16px] my-2 text-center max-w-[150px]">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          );
        })}
      </div>
      {setCurrentStep && (
        <div className="w-full flex justify-center mt-8">
          <Button onClick={setCurrentStep} className="mt-0">
            <PrismicRichText field={slice.primary.next_step_text} />
          </Button>
        </div>
      )}
    </div>
  );
};

const SleepingModeSVG = ({ selected = false }) => {
  return (
    <svg
      width="119"
      height="76"
      viewBox="0 0 119 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        "stroke-none h-16",
        selected ? " fill-white" : " fill-ddGreen"
      )}
    >
      <path
        id="Vector"
        d="M117.248 51.4462H114.691V32.1538C114.687 28.6041 111.828 25.7278 108.3 25.7231H105.395V6.43077C105.39 2.88098 102.532 0.00467692 99.004 0H19.9867C16.4588 0.00467692 13.6003 2.88098 13.5956 6.43077V25.7231H10.6906C7.16268 25.7278 4.30412 28.6041 4.29947 32.1538V51.4462H1.74303C0.780877 51.4462 0 52.2319 0 53.2V62.5538C0 63.522 0.780877 64.3077 1.74303 64.3077H9.29615V74.2462C9.29615 75.2143 10.077 76 11.0392 76H22.6594C23.3752 76.0047 24.0189 75.5674 24.2862 74.8986L28.488 64.3077H90.5027L94.7138 74.8986C94.9811 75.5674 95.6248 76.0047 96.3406 76H107.961C108.923 76 109.704 75.2143 109.704 74.2462V64.3077H117.257C118.219 64.3077 119 63.522 119 62.5538V53.2C119 52.2319 118.219 51.4462 117.257 51.4462C117.255 51.4462 117.25 51.4462 117.248 51.4462ZM17.0817 6.43077C17.084 4.81723 18.3831 3.51003 19.9867 3.50769H99.004C100.608 3.51003 101.907 4.81723 101.909 6.43077V25.7231H93.7749V19.2923C93.7726 16.3879 91.4323 14.0331 88.5458 14.0308H67.6295C64.743 14.0331 62.4027 16.3879 62.4004 19.2923V25.7231H56.5903V19.2923C56.588 16.3879 54.2477 14.0331 51.3612 14.0308H30.4449C27.5584 14.0331 25.2181 16.3879 25.2158 19.2923V25.7231H17.0817V6.43077ZM90.2888 25.7231H65.8865V19.2923C65.8865 18.3242 66.6673 17.5385 67.6295 17.5385H88.5458C89.508 17.5385 90.2888 18.3242 90.2888 19.2923V25.7231ZM53.1043 25.7231H28.7019V19.2923C28.7019 18.3242 29.4827 17.5385 30.4449 17.5385H51.3612C52.3234 17.5385 53.1043 18.3242 53.1043 19.2923V25.7231ZM10.6906 29.2308H108.3C109.904 29.2331 111.203 30.5403 111.205 32.1538V37.4154H7.78552V32.1538C7.78785 30.5403 9.08699 29.2331 10.6906 29.2308ZM7.78552 40.9231H111.205V51.4462H7.78552V40.9231ZM21.4788 72.4923H12.7822V64.3077H24.7324L21.4788 72.4923ZM106.209 72.4923H97.512L94.2583 64.3077H106.209V72.4923ZM115.505 60.8H3.48606V54.9538H115.505V60.8Z"
      />
    </svg>
  );
};

const DiningModeSVG = ({ selected = false }) => {
  return (
    <svg
      width="66"
      height="91"
      viewBox="0 0 66 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        "stroke-none h-16",
        selected ? " fill-white" : " fill-ddGreen"
      )}
    >
      <g id="Group 14802">
        <path
          id="Vector"
          d="M58.7937 15.0059C56.7079 15.0059 54.8922 16.4314 54.412 18.4572L48.8148 41.9564C47.8845 45.8729 47.4193 49.8795 47.4043 53.901V68.9819C45.7837 68.1866 43.998 67.7665 42.1823 67.7514L12.9809 67.6164C7.17359 67.5714 2.43174 72.2232 2.38672 78.0305C2.38672 78.0605 2.38672 78.0905 2.38672 78.1205V84.0478C2.38672 84.8731 3.06198 85.5484 3.8873 85.5484H63.9107C64.541 85.5484 65.1112 85.1432 65.3213 84.558C65.3813 84.3929 65.4113 84.2279 65.4113 84.0478V19.5076C65.4113 17.6019 64.1958 15.9212 62.4101 15.276V12.0047C64.0608 12.0047 65.4113 10.6542 65.4113 9.00352V3.00117C65.4113 1.35053 64.0608 0 62.4101 0H57.9084C56.2577 0 54.9072 1.35053 54.9072 3.00117V9.00352C54.9072 10.6542 56.2577 12.0047 57.9084 12.0047H59.409V15.0059H58.7787H58.7937ZM57.9234 3.00117H62.4252V9.00352H57.9234V3.00117ZM51.741 42.6466L57.3382 19.1625C57.5032 18.4872 58.1035 18.007 58.7937 18.007H60.9246C61.7499 18.007 62.4252 18.6823 62.4252 19.5076V80.8516L50.4205 70.9927V53.886C50.4205 50.0896 50.8706 46.3231 51.741 42.6316V42.6466ZM5.4029 82.5322V78.1055C5.4029 73.9639 8.76421 70.6026 12.9058 70.6026H12.9809L42.1823 70.7376C44.2531 70.7376 46.2488 71.4729 47.8545 72.7784L59.7391 82.5322H5.4029Z"
        />
        <path
          id="Vector_2"
          d="M65.4269 87.0342H2.40234V90.0354H65.4269V87.0342Z"
        />
        <path
          id="Vector_3"
          d="M5.55217 42.1215L1.8007 39.3154L0 41.7163L6.00234 46.2181C6.54255 46.6232 7.26284 46.6232 7.80305 46.2181L13.8054 41.7163L12.0047 39.3154L8.61336 41.8514C10.0689 30.2969 19.1775 21.1883 30.747 19.7177L28.211 23.094L30.6119 24.8947L35.1137 18.8924C35.5189 18.3522 35.5189 17.6319 35.1137 17.0917L30.6119 11.0894L28.211 12.8901L31.0171 16.6415C17.5719 18.0371 6.93271 28.6612 5.55217 42.1065V42.1215Z"
        />
        <path
          id="Vector_4"
          d="M18.6797 46.0531L21.5308 46.9835C24.562 37.7399 33.1904 31.4974 42.9142 31.5124V28.5113C31.8848 28.4962 22.101 35.579 18.6797 46.0531Z"
        />
        <path
          id="Vector_5"
          d="M20.4113 54.021H17.4102C17.4102 57.2923 18.0404 60.5485 19.2709 63.5947L22.047 62.4693C20.9665 59.7832 20.4113 56.9171 20.4113 54.036V54.021Z"
        />
      </g>
    </svg>
  );
};

const DrivingModeSVG = ({ selected = false }) => {
  return (
    <svg
      width="76"
      height="86"
      viewBox="0 0 76 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        "h-16",
        selected ? " fill-white text-white" : " fill-ddGreen"
      )}
    >
      <path
        id="Vector"
        d="M27.0958 24.3283C29.932 24.3283 32.5145 25.4728 34.3857 27.3172C36.2598 29.1534 37.4227 31.6949 37.4227 34.4917V46.1097C37.4227 48.8955 36.2626 51.437 34.3913 53.2814L34.3802 53.2923C33.5603 54.0965 32.6037 54.7689 31.5523 55.2685L32.2188 64.1281C32.9467 64.2818 33.6857 64.4026 34.4276 64.4986C35.5598 64.6413 36.7562 64.7155 38.0028 64.7155C39.2494 64.7155 40.4458 64.6413 41.578 64.4986C42.3226 64.4053 43.0589 64.2818 43.7867 64.1281L44.4533 55.2685C43.3991 54.7662 42.4397 54.0938 41.6171 53.2841C39.743 51.4479 38.5801 48.9064 38.5801 46.1097V34.4944C38.5801 33.4844 39.4111 32.6638 40.4402 32.6638C41.4692 32.6638 42.3003 33.4817 42.3003 34.4944V46.1097C42.3003 47.8964 43.0449 49.5212 44.2413 50.7014C44.9859 51.4397 45.909 52.0024 46.9436 52.3207H46.9492C47.5683 52.5129 48.2265 52.6144 48.9069 52.6144C50.7224 52.6144 52.3762 51.8816 53.5726 50.7042C54.7746 49.5295 55.5136 47.9046 55.5136 46.1124V34.4972C55.5136 33.4871 56.3446 32.6665 57.3737 32.6665C58.4028 32.6665 59.2338 33.4844 59.2338 34.4972V46.1124C59.2338 48.9009 58.0709 51.4425 56.1968 53.2868C55.3769 54.0965 54.4204 54.7717 53.3606 55.274L53.7092 59.9316C57.0167 57.6947 59.8083 54.7689 61.8692 51.3684C64.3373 47.2898 65.7568 42.5115 65.7568 37.401C65.7568 29.8587 62.6501 23.0274 57.6275 18.0843C52.6049 13.1413 45.6636 10.0837 38 10.0837C30.3364 10.0837 23.3951 13.1413 18.3725 18.0843C13.3499 23.0274 10.2432 29.8587 10.2432 37.401C10.2432 42.5115 11.6627 47.2898 14.1308 51.3684C16.1917 54.7689 18.9805 57.6975 22.2908 59.9316L22.6394 55.2712C21.5852 54.7689 20.6287 54.0965 19.8087 53.2896L19.7976 53.2786C17.9291 51.4342 16.7718 48.8982 16.7718 46.1124V34.4944C16.7718 31.6976 17.9319 29.1589 19.8032 27.3172L19.9203 27.2102C21.7832 25.4317 24.3182 24.3338 27.0958 24.3338V24.3283ZM32.4977 67.8937L32.7125 70.7426C33.3595 70.8415 34.0009 70.9238 34.6395 70.9842C35.7048 71.0857 36.8287 71.1379 38.0028 71.1379C39.1769 71.1379 40.3008 71.0857 41.3661 70.9842C42.0019 70.9238 42.6461 70.8415 43.2931 70.7426L43.5079 67.8937C43.0254 67.9761 42.5374 68.0502 42.0465 68.1133C40.6884 68.2862 39.3358 68.374 38.0056 68.374C36.6753 68.374 35.3228 68.2862 33.9646 68.1133C33.4738 68.0529 32.9858 67.9788 32.5033 67.8937H32.4977ZM54.0216 64.0622L54.2503 67.117C59.3231 64.4273 63.6262 60.5162 66.7524 55.7899C70.2495 50.5065 72.2826 44.1884 72.2826 37.3955C72.2826 28.0775 68.4452 19.6405 62.2401 13.5365C56.0379 7.43244 47.4651 3.65309 37.9972 3.65309C28.5293 3.65309 19.9566 7.42969 13.7543 13.5365C7.55203 19.6405 3.71187 28.0775 3.71187 37.3955C3.71187 44.1884 5.7449 50.5065 9.24204 55.7927C12.3683 60.5189 16.6742 64.4273 21.7442 67.117L21.9728 64.0595C17.4411 61.4164 13.6427 57.6865 10.946 53.232C8.13489 48.5908 6.52018 43.1729 6.52018 37.3955C6.52018 28.8405 10.0424 21.0952 15.7399 15.4906C21.4346 9.88613 29.3046 6.41693 37.9972 6.41693C46.6899 6.41693 54.5598 9.88339 60.2545 15.4906C65.9492 21.0952 69.4742 28.8405 69.4742 37.3955C69.4742 43.1729 67.8568 48.5935 65.0484 53.2347C62.3517 57.6865 58.5506 61.4192 54.0216 64.0595V64.0622ZM32.9913 74.4698L33.3065 78.6856C33.5519 81.9544 32.0822 84.1529 30.0854 85.2397C29.1679 85.7365 28.1305 85.989 27.0958 85.9863C26.0668 85.9945 25.0294 85.7393 24.1035 85.237C22.1039 84.1529 20.637 81.9544 20.8824 78.6856L21.4541 71.072C15.2045 68.0941 9.90856 63.4721 6.14091 57.7798C2.25613 51.9118 0 44.9075 0 37.3982C0 27.0702 4.25569 17.7193 11.13 10.9538C18.0072 4.18555 27.5086 0 38 0C48.4914 0 57.9956 4.18555 64.87 10.9538C71.7471 17.722 76 27.0702 76 37.3982C76 44.9103 73.7411 51.9118 69.8591 57.7798C66.0914 63.4721 60.7928 68.0913 54.5459 71.0747L55.1176 78.6883C55.363 81.9572 53.8961 84.1556 51.8965 85.2425C50.9706 85.7448 49.9332 86 48.9069 86C47.8807 86 46.8405 85.7448 45.9146 85.2425C43.9178 84.1556 42.4481 81.9599 42.6935 78.6883L43.0087 74.4726C42.582 74.5275 42.1497 74.5741 41.7119 74.618C40.4513 74.7388 39.2103 74.8019 38 74.8019C36.7897 74.8019 35.5459 74.7388 34.2881 74.618C33.8503 74.5769 33.418 74.5275 32.9913 74.4726V74.4698ZM48.1094 46.1097C48.1094 47.1197 47.2783 47.9403 46.2492 47.9403C45.2202 47.9403 44.3891 47.1224 44.3891 46.1097V31.7169C44.3891 30.7068 45.2202 29.8862 46.2492 29.8862C47.2783 29.8862 48.1094 30.7041 48.1094 31.7169V46.1097ZM53.4192 46.1097C53.4192 47.1197 52.5881 47.9403 51.5591 47.9403C50.53 47.9403 49.699 47.1224 49.699 46.1097V31.7169C49.699 30.7068 50.53 29.8862 51.5591 29.8862C52.5881 29.8862 53.4192 30.7041 53.4192 31.7169V46.1097ZM48.101 56.2401L46.8907 72.362L46.8795 72.4965L46.3942 78.9408C46.2743 80.5657 46.8739 81.5894 47.6994 82.0368C48.0647 82.2344 48.483 82.3359 48.9069 82.3359C49.3308 82.3359 49.7492 82.2344 50.1117 82.0368C50.9372 81.5894 51.5368 80.5657 51.4141 78.9408L50.7559 70.158L50.7448 70.0098L50.2344 63.2141V63.1702L50.2288 63.1263L49.7129 56.2401C49.4452 56.2593 49.1775 56.2703 48.9069 56.2703C48.6364 56.2703 48.3659 56.2593 48.101 56.2401ZM27.9018 56.2401C27.6369 56.2593 27.3664 56.2703 27.0958 56.2703C26.8253 56.2703 26.5548 56.2593 26.2899 56.2401L25.2552 70.0181V70.062L25.2497 70.1059L25.2441 70.1498L24.5832 78.9408C24.4632 80.5657 25.06 81.5866 25.8883 82.0368C26.2536 82.2344 26.672 82.3359 27.0958 82.3359C27.5086 82.3442 27.9269 82.2399 28.3006 82.0395C29.1261 81.5921 29.7257 80.5684 29.6058 78.9436L29.1205 72.4992L29.1094 72.3647L27.899 56.2428L27.9018 56.2401ZM27.0958 27.9897C25.3166 27.9897 23.6991 28.6868 22.5139 29.8121L22.4274 29.9027C21.2282 31.0828 20.4864 32.7077 20.4864 34.4944V46.1124C20.4864 47.9046 21.2282 49.5295 22.4218 50.7042C23.621 51.8871 25.2748 52.6144 27.0958 52.6144C28.9169 52.6144 30.5707 51.8843 31.7615 50.7096C32.9635 49.5295 33.7025 47.9019 33.7025 46.1097V34.4917C33.7025 32.7049 32.9579 31.0801 31.7615 29.8999C30.5679 28.717 28.9169 27.9897 27.0958 27.9897Z"
      />
    </svg>
  );
};
