import { PrismicRichText } from "@/components/PrismicRichText";

export const DropdownTrigger = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center">
      <PrismicRichText
        field={text}
        components={{
          paragraph: ({ children }) => (
            <p className="inline mr-3 text-[#707070] font-bold text-[20px] tablet:text-[22px]">
              {children}
            </p>
          ),
          heading2: ({ children }) => (
            <p className="inline mr-3 text-[#707070] font-bold text-[20px] tablet:text-[22px]">
              {children}
            </p>
          ),
        }}
      />
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.03573e-08 2.42279L2.42848 2.89594e-08L8 5.27707L13.5715 1.61839e-07L16 2.42279L8 10L9.03573e-08 2.42279Z"
          fill="#3B6552"
        />
      </svg>
    </button>
  );
};
