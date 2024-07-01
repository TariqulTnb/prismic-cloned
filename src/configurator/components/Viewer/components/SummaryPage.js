import { SummaryForm } from "@/slices/SummaryForm";
import { SummaryComparison } from "@/slices/SummaryComparison";
import { useQueryClient } from "@tanstack/react-query";
import { calculateVanObj } from "../lib";

export const SummaryPage = ({
  compareSlice,
  formSlice,
  pageData,
  defaultOptions,
  setCurrentStep,
  packages,
  comparisonPage,
  summaryStep,
  setSummaryStep,
}) => {
  const queryClient = useQueryClient();

  console.log("comparison page here", comparisonPage);

  const mainVanObj = calculateVanObj({
    packages,
    queryClient,
    pageData,
    mainModel: pageData.data.model,
  });

  const comparisonSlice = comparisonPage.data.slices.find(
    (s) => s.slice_type == "summary_comparison"
  );

  const comparisonVanObj = calculateVanObj({
    packages,
    queryClient,
    pageData: comparisonPage,
    comparison: true,
    mainModel: pageData.data.model,
  });

  console.log("main obj is", mainVanObj);

  console.log("comparison van obj", comparisonVanObj);

  if (summaryStep.includes("form")) {
    return (
      <SummaryForm
        slice={formSlice}
        pageData={pageData}
        defaultOptions={defaultOptions}
        setSummaryStep={setSummaryStep}
        mainObj={mainVanObj}
        comparisonObj={comparisonVanObj}
      />
    );
  }

  if (summaryStep.includes("compare")) {
    return (
      <SummaryComparison
        slice={compareSlice}
        pageData={pageData}
        setCurrentStep={setCurrentStep}
        mainObj={mainVanObj}
        comparisonObj={comparisonVanObj}
        comparisonSlice={comparisonSlice}
      />
    );
  }
};
