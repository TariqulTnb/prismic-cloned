import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import { useResponsive } from "@/hooks/useResponsive";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import PostCardsPreview from "@/slices/PostCardsPreview";
import TitleBlock from "@/slices/TitleBlock";

const SectionHeading = ({ text }) => {
  return (
    <div className="flex justify-between border-b border-b-black mb-2">
      <PrismicRichText
        field={text}
        components={{
          paragraph: ({ children }) => {
            return (
              <p className="text-[14px] text-left font-semibold my-2">
                {children}
              </p>
            );
          },
        }}
      />
    </div>
  );
};

function formatNumberToYen(numberString) {
  // Parse the number string into a number
  const number = parseInt(numberString, 10);

  // Format the number with commas as thousands separators
  const formattedNumber = number.toLocaleString();

  // Add the yen symbol and return the result
  return `￥${formattedNumber}`;
}

const SectionWithPrice = ({ text_field, price, justifyEnd = false }) => {
  return (
    <div
      className={clsx(
        "flex my-2",
        justifyEnd ? "justify-end" : "justify-between"
      )}
    >
      <PrismicRichText
        field={text_field}
        components={{
          paragraph: ({ children }) => {
            return <p className="text-[14px] text-left">{children}</p>;
          },
        }}
      />
      <div className="text-[14px]">{formatNumberToYen(price)}</div>
    </div>
  );
};

const InteriorOption = ({
  property,
  step,
  text,
  model,
  setCurrentStep,
  option,
  price,
  comparisonVan = false,
}) => {
  console.log("property", property);

  if (property) {
    return (
      <div className="flex justify-between">
        <PrismicRichText
          field={text}
          components={{
            paragraph: ({ children }) => {
              return (
                <p
                  onClick={() =>
                    !comparisonVan && setCurrentStep([model, step])
                  }
                  className={clsx(
                    "text-[14px] font-bold text-left",
                    !comparisonVan &&
                      "hover:underline underline-offset-2 cursor-pointer text-ddGreen"
                  )}
                >
                  {children}
                </p>
              );
            },
          }}
        />
        <div className="text-[14px]">
          {option} {price && `(${formatNumberToYen(price)})`}
        </div>
      </div>
    );
  } else {
    console.log("no property found :(", property);
  }
};

const PackageOption = ({
  text,
  step,
  setCurrentStep,
  price,
  model,
  comparisonVan,
}) => {
  return (
    <div className="flex justify-between">
      <PrismicRichText
        field={text}
        components={{
          heading2: ({ children }) => {
            return (
              <p
                onClick={() => !comparisonVan && setCurrentStep([model, step])}
                className={clsx(
                  "text-[14px] font-bold text-left my-1 pr-2",
                  !comparisonVan &&
                    "hover:underline underline-offset-2 cursor-pointer  text-ddGreen"
                )}
              >
                {children}
              </p>
            );
          },
          paragraph: ({ children }) => {
            return (
              <p
                onClick={() => !comparisonVan && setCurrentStep([model, step])}
                className={clsx(
                  "text-[14px] font-bold text-left my-1",
                  !comparisonVan &&
                    "hover:underline underline-offset-2 cursor-pointer  text-ddGreen"
                )}
              >
                {children}
              </p>
            );
          },
        }}
      />
      {price && (
        <div className="text-[14px] my-1">{formatNumberToYen(price)}</div>
      )}
    </div>
  );
};

/**
 * @typedef {import("@prismicio/client").Content.SummaryComparisonSlice} SummaryComparisonSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SummaryComparisonSlice>} SummaryComparisonProps
 * @param {SummaryComparisonProps}
 */
export const SummaryComparison = ({
  slice,
  setCurrentStep,
  mainObj,
  comparisonObj,
  comparisonSlice,
  pageData,
}) => {
  const { isMobileSize, isTabletSize } = useResponsive();

  const [activeModel, setActiveModel] = useState(mainObj.model);

  const containerRef = useRef(null);

  const modelSelectedByButton = useRef(false);

  console.log("page data", pageData);

  // This scrolls the container to the model based on the active model (e.g not based on scrolling)
  useEffect(() => {
    if (containerRef.current) {
      if (activeModel === mainObj.model) {
        containerRef.current.scrollLeft = 0; // Scroll to the far left
      } else if (activeModel === comparisonObj.model) {
        containerRef.current.scrollLeft = containerRef.current.scrollWidth; // Scroll to the far right
      }

      setTimeout(() => {
        modelSelectedByButton.current = false;
      }, 500); // you may need to adjust the delay
    }
  }, [activeModel]);

  // This sets the active model based on the users scrolling
  useEffect(() => {
    const currentContainer = containerRef.current;

    const handleScroll = () => {
      // this code should only be executed if the user is scrolling. If they click a button - don't execute
      if (modelSelectedByButton.current) {
        return;
      }
      const scrollPosition = currentContainer.scrollLeft;
      const halfScrollPosition =
        (currentContainer.scrollWidth - currentContainer.clientWidth) / 2;

      if (scrollPosition <= halfScrollPosition) {
        setActiveModel(mainObj.model);
      } else {
        setActiveModel(comparisonObj.model);
      }
    };

    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);

      return () => {
        currentContainer.removeEventListener("scroll", handleScroll);
      };
    }
  });

  const selectPreviousModel = () => {
    modelSelectedByButton.current = true;
    if (activeModel !== mainObj.model) {
      // const currentIndex = models.indexOf(activeModel);
      setActiveModel(mainObj.model);
    }
  };

  const selectNextModel = () => {
    modelSelectedByButton.current = true;
    if (activeModel === mainObj.model) {
      // const currentIndex = models.indexOf(activeModel);
      setActiveModel(comparisonObj.model);
    }
  };

  const getPreviewSlice = () => {
    return pageData.data.slices.find(
      (slice) => slice.slice_type === "post_cards_preview"
    );
  };

  const getTitleBlockSlice = () => {
    return pageData.data.slices.find(
      (slice) => slice.slice_type === "title_block"
    );
  };

  console.log("main object is", mainObj);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-6 laptop:py-12 padded-container"
    >
      <div className="flex w-full justify-center">
        <div className="">
          <PrismicNextImage
            className="mx-auto w-52"
            field={slice.primary.title_image}
          />
          <PrismicRichText
            field={slice.primary.section_title}
            components={{
              heading2: ({ children }) => {
                return (
                  <h2 className="font-semibold mx-auto text-center my-8">
                    {children}
                  </h2>
                );
              },
            }}
          />
          <div className="mx-auto max-w-[900px]">
            <PrismicRichText
              field={slice.primary.submited_message}
              components={{
                paragraph: ({ children }) => {
                  return (
                    <p className="text-[16px] text-center font-medium px-4  mx-auto my-2">
                      {children}
                    </p>
                  );
                },
              }}
            />
          </div>
          {/* Menu to select model */}
          {isMobileSize() && !isTabletSize() && (
            <div className="mt-8 h-16 bg-menuBeigeDark relative">
              <div className="flex justify-between w-full items-center h-full px-6">
                <button onClick={selectPreviousModel}>
                  <svg
                    width="14"
                    height="21"
                    viewBox="0 0 14 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.6081 0L14 3.18738L6.61211 10.5L14 17.8126L10.6081 21L0 10.5L10.6081 0Z"
                      fill="#3B6552"
                    />
                  </svg>
                </button>
                <div className="flex justify-center ">
                  <button
                    className=""
                    onClick={() => {
                      modelSelectedByButton.current = true;
                      setActiveModel(mainObj.model);
                    }}
                  >
                    <PrismicRichText
                      field={slice.primary.your_van_text}
                      components={{
                        paragraph: ({ children }) => (
                          <h2
                            className={clsx(
                              activeModel === mainObj.model
                                ? "text-ddGreen font-bold underline underline-offset-[8px] decoration-[2px] decoration-ddGreen"
                                : "font-normal text-black ",
                              "text-center font-semibold text-[1rem] mx-4"
                            )}
                          >
                            {children}
                          </h2>
                        ),
                      }}
                    />
                  </button>
                  <button
                    className=""
                    onClick={() => {
                      modelSelectedByButton.current = true;
                      setActiveModel(comparisonObj.model);
                    }}
                  >
                    <PrismicRichText
                      field={comparisonSlice.primary.compared_to_text}
                      components={{
                        paragraph: ({ children }) => (
                          <h2
                            className={clsx(
                              activeModel === comparisonObj.model
                                ? "text-ddGreen font-bold underline underline-offset-[8px] decoration-[2px] decoration-ddGreen"
                                : "font-normal text-black ",
                              "text-center font-semibold text-[1rem] inline-block mx-4"
                            )}
                          >
                            {children}
                          </h2>
                        ),
                      }}
                    />
                  </button>
                </div>
                <button onClick={selectNextModel}>
                  <svg
                    width="14"
                    height="21"
                    viewBox="0 0 14 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.39191 21L1.6287e-06 17.8126L7.38789 10.5L3.5012e-07 3.18738L3.39191 -9.7996e-07L14 10.5L3.39191 21Z"
                      fill="#3B6552"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
          <div
            ref={containerRef}
            className="flex w-screen tablet:justify-center overflow-x-auto no-scrollbar scroll-smooth px-4"
          >
            <VanSummary
              mainObj={mainObj}
              slice={slice}
              setCurrentStep={setCurrentStep}
            />
            <VanSummary
              mainObj={comparisonObj}
              slice={comparisonSlice}
              setCurrentStep={setCurrentStep}
              comparisonVan={true}
            />
          </div>
        </div>
      </div>
      <div className="my-6">
        {getTitleBlockSlice() && <TitleBlock slice={getTitleBlockSlice()} />}
      </div>
      {getPreviewSlice() && <PostCardsPreview slice={getPreviewSlice()} />}
    </section>
  );
};

export const VanSummary = ({
  slice,
  mainObj,
  setCurrentStep,
  comparisonVan,
}) => {
  const getOptions = () => {
    const options = [];
    if (mainObj.options.roofRack !== null) {
      options.push(mainObj.options.roofRack);
    }

    if (mainObj.options.sideAwning !== null) {
      options.push(mainObj.options.sideAwning);
    }

    if (mainObj.options.batterySlice !== null) {
      options.push(mainObj.options.batterySlice);
    }

    return options;
  };

  const renderChosenOption = ({ property }) => {
    return (
      <span>
        <PrismicRichText
          field={property.name}
          components={{
            paragraph: ({ children }) => {
              return (
                <>
                  <p className="text-[14px] mb-2 underline-offset-2 underline text-right">
                    {children}
                  </p>
                  {property.price && (
                    <p className="text-[14px] text-right mb-2">
                      {property.price &&
                        `(+${formatNumberToYen(property.price)})`}
                    </p>
                  )}
                </>
              );
            },
          }}
        />
      </span>
    );
  };

  const renderBaseConfig = ({ obj }) => {
    return (
      <div
        className="flex justify-center"
        onClick={() =>
          !comparisonVan && setCurrentStep([obj.model, "base_config"])
        }
      >
        {obj.model === "tama" && (
          <PrismicRichText
            field={obj.roof.name}
            components={{
              paragraph: ({ children }) => {
                return (
                  <p
                    className={clsx(
                      "text-[16px] flex-0 text-center font-medium mb-2 mr-2",
                      !comparisonVan &&
                        "hover:underline underline-offset-2 cursor-pointer text-ddGreen"
                    )}
                  >
                    {children}
                  </p>
                );
              },
            }}
          />
        )}
        <PrismicRichText
          field={obj.base.name}
          components={{
            paragraph: ({ children }) => {
              return (
                <p
                  className={clsx(
                    "text-[16px] text-center font-medium mb-2",
                    !comparisonVan &&
                      "hover:underline underline-offset-2 cursor-pointer text-ddGreen"
                  )}
                >
                  {children}
                </p>
              );
            },
          }}
        />
      </div>
    );
  };

  const showOptionsSection = () => {
    return (
      Object.values(mainObj.options).filter((obj) => obj !== null).length > 2 ||
      mainObj.options.exterior.key !== "white" ||
      mainObj.options.tyres.key !== "standard"
    );
  };

  return (
    <section className="shrink-0 w-10/12 tablet:w-auto laptop:w-[400px] border border-[#D0D0D0] bg-menuBeigeDark rounded-xs mt-10 px-0 py-2 mx-4 laptop:mx-6">
      <div className="mx-auto">
        <PrismicNextImage
          className="mx-auto w-36 mt-4"
          field={slice.primary.title_image}
        />
        {renderBaseConfig({ obj: mainObj })}
        <PrismicNextImage
          className="mx-auto w-52 my-8"
          field={slice.primary.van_image}
        />
        <div className="bg-ddGreen w-full h-8 flex items-center ">
          <PrismicRichText
            field={
              comparisonVan
                ? slice.primary.compared_to_text
                : slice.primary.your_van_text
            }
            components={{
              paragraph: ({ children }) => {
                return (
                  <p className="text-[14px] text-center text-white font-semibold  mx-auto my-2">
                    {children}
                  </p>
                );
              },
            }}
          />
        </div>
        <section className="px-5 my-2">
          <div className="flex justify-between border-b border-b-black">
            <PrismicRichText
              field={slice.primary.total_price_text}
              components={{
                paragraph: ({ children }) => {
                  return (
                    <p className="text-[16px] text-left font-bold my-2">
                      {children}
                    </p>
                  );
                },
              }}
            />
            <div className="text-[16px] font-bold my-2">
              {formatNumberToYen(mainObj.totals.final)}{" "}
              {slice.primary.including_tax_text}
            </div>
          </div>
          <div className="flex justify-between my-2">
            <PrismicRichText
              field={slice.primary.base_price_text}
              components={{
                paragraph: ({ children }) => {
                  return <p className="text-[14px] text-left ">{children}</p>;
                },
              }}
            />
            <div className="text-[14px]">
              {formatNumberToYen(mainObj.totals.base)}
            </div>
          </div>
          <div className="flex justify-between my-2">
            <PrismicRichText
              field={slice.primary.options_total_text}
              components={{
                paragraph: ({ children }) => {
                  return <p className="text-[14px] text-left">{children}</p>;
                },
              }}
            />
            <div className="text-[14px]">
              {formatNumberToYen(mainObj.totals.options)}
            </div>
          </div>
          <div className="flex justify-between">
            <PrismicRichText
              field={slice.primary.total_other_expenses_text}
              components={{
                paragraph: ({ children }) => {
                  return <p className="text-[14px] text-left">{children}</p>;
                },
              }}
            />
            <div className="text-[14px]">
              {formatNumberToYen(mainObj.totals.taxes)}
            </div>
          </div>
        </section>
        <section className="px-5 mt-12 ">
          <SectionHeading text={slice.primary.interior_section_text} />
          <InteriorOption
            property={mainObj.seats}
            text={slice.primary.seats_title_text}
            step="seats"
            setCurrentStep={setCurrentStep}
            option={renderChosenOption({
              property: mainObj.seats,
            })}
            model={mainObj.model}
            comparisonVan={comparisonVan}
          />
          <InteriorOption
            property={mainObj.cabinets}
            text={slice.primary.cabinets_title_text}
            step="cabinets"
            setCurrentStep={setCurrentStep}
            option={renderChosenOption({
              property: mainObj.cabinets,
            })}
            model={mainObj.model}
            comparisonVan={comparisonVan}
          />
          <InteriorOption
            property={mainObj.floors}
            text={slice.primary.floors_title_text}
            step="floors"
            setCurrentStep={setCurrentStep}
            option={renderChosenOption({ property: mainObj.floors })}
            model={mainObj.model}
            comparisonVan={comparisonVan}
          />
          <InteriorOption
            property={mainObj.ceilings}
            text={slice.primary.ceilings_title_text}
            step="ceilings"
            setCurrentStep={setCurrentStep}
            option={renderChosenOption({
              property: mainObj.ceilings,
            })}
            model={mainObj.model}
            comparisonVan={comparisonVan}
          />
          <InteriorOption
            property={mainObj.walls}
            text={slice.primary.walls_title_text}
            step="walls"
            setCurrentStep={setCurrentStep}
            option={renderChosenOption({
              property: mainObj.walls,
            })}
            model={mainObj.model}
            comparisonVan={comparisonVan}
          />
        </section>
        {mainObj.packages.length > 0 && (
          <section className="px-5 mt-4 ">
            <SectionHeading text={slice.primary.packages_section_text} />
            {mainObj.packages.map((property) => {
              return (
                <PackageOption
                  key={property.key}
                  text={property.name}
                  step="interior"
                  setCurrentStep={setCurrentStep}
                  price={property.price}
                  model={mainObj.model}
                  comparisonVan={comparisonVan}
                />
              );
            })}
          </section>
        )}
        {showOptionsSection() && (
          <section className="px-5 mt-4 ">
            <SectionHeading text={slice.primary.options_section_text} />
            {mainObj.options.exterior.key !== "white" && (
              <InteriorOption
                property={mainObj.options.exterior}
                text={slice.primary.exterior_title_text}
                step="exterior"
                setCurrentStep={setCurrentStep}
                option={renderChosenOption({
                  property: mainObj.options.exterior,
                })}
                model={mainObj.model}
                comparisonVan={comparisonVan}
              />
            )}
            {mainObj.options.tyres.key === "offroad" && (
              <InteriorOption
                property={mainObj.options.tyres}
                text={slice.primary.tyres_title_text}
                step="tyres"
                setCurrentStep={setCurrentStep}
                option={renderChosenOption({
                  property: mainObj.options.tyres,
                })}
                model={mainObj.model}
                comparisonVan={comparisonVan}
              />
            )}

            {getOptions().map((item) => {
              return (
                <PackageOption
                  key={item.key}
                  text={item.name}
                  step={"interior"}
                  setCurrentStep={setCurrentStep}
                  price={item?.price}
                  comparisonVan={comparisonVan}
                />
              );
            })}
          </section>
        )}
        <section className="px-5 mt-4 ">
          <SectionHeading text={slice.primary.registration_section_text} />
          <SectionWithPrice
            justifyEnd={true}
            text_field={slice.primary.registration_fee_text}
            price={slice.primary.estimated_expense_value}
          />
        </section>
        <section className="px-5 mt-4 ">
          <SectionHeading text={slice.primary.tax_section_text} />
          <SectionWithPrice
            text_field={mainObj.taxes.emissionsTax.name}
            price={mainObj.taxes.emissionsTax.amount}
          />
          <SectionWithPrice
            text_field={mainObj.taxes.carWeightTax.name}
            price={mainObj.taxes.carWeightTax.amount}
          />
          <div className="flex justify-between my-2">
            <PrismicRichText
              field={mainObj.taxes.carTaxRate.name}
              components={{
                paragraph: ({ children }) => {
                  return (
                    <p className="text-[14px] text-left">
                      {children}（{mainObj.taxes.carTaxRate.month}月）
                    </p>
                  );
                },
              }}
            />
            <div className="text-[14px]">
              {formatNumberToYen(mainObj.taxes.carTaxRate.amount)}
            </div>
          </div>
          <SectionWithPrice
            text_field={mainObj.taxes.liabilityInsurance.name}
            price={mainObj.taxes.liabilityInsurance.amount}
          />
        </section>
      </div>
    </section>
  );
};

export default SummaryComparison;
