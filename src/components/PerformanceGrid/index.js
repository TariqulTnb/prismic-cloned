import { PrismicRichText } from "@/components/PrismicRichText";

export const PerformanceGrid = ({ items }) => {
  return (
    <div className="performance-grid laptop:max-w-lg my-6">
      {items.map((item) => {
        return (
          <>
            <div className="max-w-[300px]">
              <PrismicRichText
                field={item.title}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="font-bold text-[16px] laptop:text-[18px]">
                      {children}
                    </h2>
                  ),
                  paragraph: ({ children }) => (
                    <p className="mb-2 text-[16px] laptop:text-[18px]">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
            <div>
              <PrismicRichText field={item.text} />
            </div>
          </>
        );
      })}
    </div>
  );
};
