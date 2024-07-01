import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PackageFeature } from "@/configurator/components/Viewer/components/PackageFeature";
import { ChooseExternalOptions } from "./ChooseExternalOptions";

export const ChooseInterior = ({
  slice,
  exteriorOptionsSlice,
  optionalItemsSlice,
  setCurrentStep,
  packages,
  queryClient,
}) => {
  console.log("slice in interior is", slice);
  console.log("packages in interior", packages);

  const calculateSelectedPackages = () => {
    // find package names
    const keyNames = slice.items.map((item) => item.key_name);
    // find packages that the user has selected

    const packageKeysSelectedArray = keyNames.map(
      (key) =>
        queryClient.getQueryData([slice.primary.model, "package", key]) || false
    );

    return packageKeysSelectedArray;
  };

  const findPackageFeatures = (packageKey) => {
    const result = packages.data.slices.find((packageItem) => {
      console.log("package item", packageItem, "key", packageKey);
      return packageItem.primary.package_key === packageKey;
    });
    return result;
  };

  const [packageState, setPackageState] = useState(calculateSelectedPackages());

  useEffect(() => {
    const packageKeys = packages.data.slices.map(
      (item) => item.primary.package_key
    );

    packageKeys.forEach((key) => {
      queryClient.setQueryData([slice.primary.model, key], () => {
        return false;
      });
    });

    // set query of each package name to be false
    slice.items.forEach((item) => {
      queryClient.setQueryData([slice.primary.model, item.key_name], () => {
        return false;
      });
    });
  }, []);

  const togglePackage = (idx) => {
    const packageKeys = findPackageFeatures(
      slice.items[idx].key_name
    ).items.map((item) => item.item_key);

    packageKeys.forEach((key) => {
      queryClient.setQueryData([slice.primary.model, "option", key], () => {
        return !packageState[idx];
      });
    });

    // set query of package name to be true / false
    queryClient.setQueryData(
      [slice.primary.model, "package", slice.items[idx].key_name],
      () => {
        return !packageState[idx];
      }
    );

    setPackageState((prevState) => {
      const newState = [...prevState];
      newState[idx] = !prevState[idx];
      return newState;
    });
  };

  return (
    <div className="padded-container">
      <div className="text-center mt-8">
        <PrismicRichText
          field={slice.primary.instruction}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-black mb-4">{children}</h2>
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
      <div className="flex flex-col desktop:flex-row mt-8 gap-x-8 gap-y-8 overflow-scroll w-full items-center">
        {slice.items.map((item, idx) => {
          console.log("item here", item);
          return (
            <div key={idx}>
              <div className="border border-[#D0D0D0] relative text-center shrink-0 max-w-[369px] bg-menuBeigeDark rounded-md">
                <div className="mx-5 mt-5">
                  <div className=" flex items-center">
                    <input
                      className="rounded-xs border border-[#898989] mr-2 h-6 w-6 text-ddGreen active:ring-0 focus:ring-0"
                      type="checkbox"
                      name="seat_config"
                      id={`option_${idx}`}
                      value={idx}
                      checked={packageState[idx]}
                      onChange={() => togglePackage(idx)}
                    />
                    <div
                      className="flex items-center"
                      onClick={() => togglePackage(idx)}
                    >
                      <PrismicRichText
                        field={item.title}
                        components={{
                          heading2: ({ children }) => (
                            <h2 className="text-black flex items-center text-[16px] font-semibold cursor-pointer text-left h-[50px]">
                              {children}
                            </h2>
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <div className="my-4 laptop:h-[175px]">
                    <PrismicRichText
                      field={item.description}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="text-black text-[14px] text-left">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </div>
                  <div className="my-4 laptop:h-[250px] py-4">
                    <PrismicRichText
                      field={item.features_title}
                      components={{
                        heading2: ({ children }) => (
                          <h2 className="text-black text-[18px] text-left font-semibold">
                            {children}
                          </h2>
                        ),
                      }}
                    />
                    {findPackageFeatures(item.key_name)?.items.map(
                      (feature, idx) => (
                        <PackageFeature key={idx} feature={feature} />
                      )
                    )}
                  </div>
                  <div className="my-4">
                    <button
                      onClick={() => togglePackage(idx)}
                      className={clsx(
                        packageState[idx]
                          ? " border-ddGreen border"
                          : "bg-ddGreen hover:bg-ddGreenHover",
                        " w-full h-12 rounded"
                      )}
                    >
                      <PrismicRichText
                        field={
                          packageState[idx]
                            ? item.remove_package_text
                            : item.add_package_text
                        }
                        components={{
                          paragraph: ({ children }) => (
                            <p
                              className={clsx(
                                packageState[idx]
                                  ? "text-ddGreen"
                                  : "text-white",
                                "text-[14px] text-center font-bold"
                              )}
                            >
                              {children}
                            </p>
                          ),
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-8">
        <ChooseExternalOptions slice={exteriorOptionsSlice} />
      </div>
      <div className="w-full flex justify-center mt-2">
        <ChooseExternalOptions
          slice={optionalItemsSlice}
          setCurrentStep={() =>
            setCurrentStep([slice.primary.model, "preview"])
          }
        />
      </div>
    </div>
  );
};
