import { PrismicRichText } from "@/components/PrismicRichText";
import { InfoCell } from "./InfoCell";
import { LabelCell } from "./LabelCell";

export const InfoBox = ({ item }) => {
  return (
    <div className="mx-auto px-4 mt-10 tablet:mt-0 max-w-xl">
      <PrismicRichText
        field={item.model_info_title}
        components={{
          heading2: ({ children }) => (
            <h2 className="my-3 text-[1.25rem]">{children}</h2>
          ),
        }}
      />
      <div className="grid gap-x-6 gap-y-2 grid-cols-[max-content_1fr]">
        <LabelCell label={item.passengers_label} />
        <InfoCell info={item.passengers_info} />
        <LabelCell label={item.can_sleep_label} />
        <InfoCell info={item.can_sleep_info} />
        <LabelCell label={item.car_model_label} />
        <InfoCell info={item.car_model_info} />
        <LabelCell label={item.car_size_label} />
        <InfoCell info={item.car_size_info} />
        <LabelCell label={item.engine_label} />
        <InfoCell info={item.engine_info} />
        <LabelCell label={item.front_seat_label} />
        <InfoCell info={item.front_seat_info} />
        <LabelCell label={item.car_registration_label} />
        <InfoCell info={item.car_registration_info} />
      </div>
    </div>
  );
};
