import { PrismicRichText } from "@/components/PrismicRichText";
import { Button } from "@/components/Common/Button";
import { PrismicNextImage } from "@prismicio/next";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

/**
 * @typedef {import("@prismicio/client").Content.SummaryFormSlice} SummaryFormSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SummaryFormSlice>} SummaryFormProps
 * @param {SummaryFormProps}
 */
export const SummaryForm = ({
  slice,
  defaultOptions,
  setSummaryStep,
  mainObj,
  comparisonObj,
  pageData,
}) => {
  console.log("summary slice", slice);
  console.log("defaults", defaultOptions);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  console.log("language is", pageData);

  const onSubmit = (data) => {
    const options = Object.entries(data.preferences)
      .filter((entry) => entry[1])
      .map((entry) => entry[0])
      .join(", ");

    console.log("form submit", data, options);

    const fields = [
      {
        name: "email",
        value: data.email,
      },
      {
        name: "firstname",
        value: data.first_name,
      },
      {
        name: "lastname",
        value: data.last_name,
      },
      {
        name: "address",
        value: data.address,
      },
      {
        name: "phone",
        value: data.phone,
      },
      {
        name: "your_preference",
        value: options,
      },
      {
        name: "chosen_campervan",
        value: JSON.stringify(mainObj),
      },
      {
        name: "comparison_van",
        value: JSON.stringify(comparisonObj),
      },
      {
        name: "configurator_langauge",
        value: pageData.lang === "ja-jp" ? "Japanese" : "English",
      },
    ];

    console.log("final fields", fields);

    fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/8672029/${slice.primary.hubspot_form_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submittedAt: Date.now(),
          fields: fields,
          context: {
            pageUri: window.location.href,
            pageName: document.title,
          },
        }),
      }
    ).then((response) => {
      console.log("got response", response);
      queryClient.setQueryData(
        [defaultOptions.primary.model, "formSubmitted"],
        true
      );
      setSummaryStep("compare");
    });
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-6 laptop:my-12"
    >
      <div className="flex w-full justify-center">
        <div className="">
          <PrismicNextImage
            className="mx-auto w-52"
            field={slice.primary.title_image}
          />
          <PrismicRichText
            field={slice.primary.main_title}
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

          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <section className="border border-[#D0D0D0] bg-menuBeigeDark rounded-xs px-4 py-2 mx-6">
              <div className="mx-auto">
                <PrismicNextImage
                  className="mx-auto w-36 my-4"
                  field={slice.primary.title_image}
                />
                <PrismicNextImage
                  className="mx-auto w-52"
                  field={slice.primary.van_image}
                />
                <div className="mx-auto">
                  <PrismicRichText
                    field={slice.primary.form_instruction}
                    components={{
                      paragraph: ({ children }) => {
                        return (
                          <p className="text-[14px] text-center font-medium w-[280px] mx-auto my-2">
                            {children}
                          </p>
                        );
                      },
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-x-8">
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="last_name"
                    className="font-semibold text-[14px] text-[#4A4A4A] mb-0"
                  >
                    <PrismicRichText
                      field={slice.primary.last_name_label}
                      components={{
                        paragraph: ({ children }) => {
                          return (
                            <p className="px-2 font-semibold mx-auto text-[14px] my-1 text-left">
                              {children}
                              <sup className="text-red-600">*</sup>
                              {errors.last_name?.type === "required" && (
                                <span
                                  className="text-xs ml-1 text-red-600"
                                  role="alert"
                                >
                                  {slice.primary.required_field_error}
                                </span>
                              )}
                            </p>
                          );
                        },
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="border w-full border-[#D0D0D0] rounded-xs px-2 py-1 bg-[#F2F2F2]"
                    {...register("last_name", { required: true })}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <label
                    htmlFor="first_name"
                    className="font-semibold text-[14px] text-[#4A4A4A] mb-0"
                  >
                    <PrismicRichText
                      field={slice.primary.first_name_label}
                      components={{
                        paragraph: ({ children }) => {
                          return (
                            <p className="px-2 font-semibold mx-auto text-[14px] my-1 text-left">
                              {children} <sup className="text-red-600">*</sup>
                              {errors.first_name?.type === "required" && (
                                <span
                                  className="text-xs ml-1 text-red-600"
                                  role="alert"
                                >
                                  {slice.primary.required_field_error}
                                </span>
                              )}
                            </p>
                          );
                        },
                      }}
                    />
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="w-full border border-[#D0D0D0] rounded-xs px-2 py-1 bg-[#F2F2F2]"
                    {...register("first_name", { required: true })}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center my-2">
                <label
                  htmlFor="email"
                  className="font-semibold text-[14px] text-[#4A4A4A] mb-0"
                >
                  <PrismicRichText
                    field={slice.primary.email_label}
                    components={{
                      paragraph: ({ children }) => {
                        return (
                          <p className="px-2 font-semibold mx-auto text-[14px] my-1 text-left w-full">
                            {children} <sup className="text-red-600">*</sup>
                            {errors.email?.type === "required" && (
                              <span
                                className="text-xs ml-1 text-red-600"
                                role="alert"
                              >
                                {slice.primary.required_field_error}
                              </span>
                            )}
                            {errors.email?.type === "pattern" && (
                              <span
                                className="text-xs ml-1 text-red-600"
                                role="alert"
                              >
                                {slice.primary.required_field_error}
                              </span>
                            )}
                          </p>
                        );
                      },
                    }}
                  />
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="border border-[#D0D0D0] rounded-xs px-2 py-1 bg-[#F2F2F2]"
                  {...register("email", {
                    required: true,
                    pattern:
                      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
                  })}
                />
              </div>
              <div className="flex flex-col justify-center my-2">
                <label
                  htmlFor="phone"
                  className="font-semibold text-[14px] text-[#4A4A4A] mb-0"
                >
                  <PrismicRichText
                    field={slice.primary.phone_label}
                    components={{
                      paragraph: ({ children }) => {
                        return (
                          <p className="px-2 font-semibold mx-auto text-[14px] my-1 text-left w-full">
                            {children} <sup className="text-red-600">*</sup>
                            {errors.phone?.type === "required" && (
                              <span
                                className="text-xs ml-1 text-red-600"
                                role="alert"
                              >
                                {slice.primary.required_field_error}
                              </span>
                            )}
                            {errors.phone?.type === "pattern" && (
                              <span
                                className="text-xs ml-1 text-red-600"
                                role="alert"
                              >
                                {slice.primary.required_field_error}
                              </span>
                            )}
                          </p>
                        );
                      },
                    }}
                  />
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="border border-[#D0D0D0] rounded-xs px-2 py-1 bg-[#F2F2F2]"
                  {...register("phone", {
                    required: true,
                    pattern: /\b\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}\b/,
                  })}
                />
              </div>
              <div className="flex flex-col justify-center my-2">
                <label
                  htmlFor="address"
                  className="font-semibold text-[14px] text-[#4A4A4A] mb-0"
                >
                  <PrismicRichText
                    field={slice.primary.address_label}
                    components={{
                      paragraph: ({ children }) => {
                        return (
                          <p className="px-2 font-semibold mx-auto text-[14px] my-1 text-left w-full">
                            {children}
                          </p>
                        );
                      },
                    }}
                  />
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="border border-[#D0D0D0] rounded-xs px-2 py-1 bg-[#F2F2F2]"
                  {...register("address", { required: false })}
                />
              </div>
              <div className="flex flex-col justify-center my-2">
                <label
                  htmlFor="options"
                  className="font-semibold text-[14px] text-[#4A4A4A] mb-0"
                >
                  <PrismicRichText
                    field={slice.primary.option_label}
                    components={{
                      paragraph: ({ children }) => {
                        return (
                          <p className="px-2 font-semibold text-[14px] mt-2 text-left w-full">
                            {children}
                          </p>
                        );
                      },
                    }}
                  />
                </label>
                <PrismicRichText
                  field={slice.primary.option_instruction}
                  components={{
                    paragraph: ({ children }) => {
                      return (
                        <p className="px-2 text-[12px] text-[#313030] my-0.5 text-left w-full">
                          {children}
                        </p>
                      );
                    },
                  }}
                />
                <div className="my-2">
                  {slice.items.map((item, index) => {
                    return (
                      <div className="my-1 px-2 flex items-center" key={index}>
                        <input
                          type="checkbox"
                          id={`option_${index}`}
                          name="options"
                          className=" px-2 py-1 text-ddGreen focus:ring-0 rounded-xs h-6 w-6 bg-[#F2F2F2]"
                          {...register(`preferences.${item.option_value}`)}
                        />
                        <label
                          htmlFor={`option_${index}`}
                          className="text-[12px] text-[#313030] ml-2"
                        >
                          <PrismicRichText
                            className=""
                            field={item.option_label}
                            components={{
                              paragraph: ({ children }) => {
                                return (
                                  <p className="px-2 text-[14px] text-[#313030] my-0.5 text-left w-full">
                                    {children}
                                  </p>
                                );
                              },
                            }}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
            <div className="flex justify-center mt-8 w-full px-8">
              <Button
                onClick={() => null}
                link={slice.primary.button_link}
                className="w-full"
              >
                <PrismicRichText field={slice.primary.submit_text} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SummaryForm;
