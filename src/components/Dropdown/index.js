import React, { useState } from "react";
import { DropdownItem } from "./DropdownItem";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import * as prismic from "@prismicio/client";

export const Dropdown = ({ trigger: TriggerComponent, menu, onItemSelect }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

  const ref = useOutsideClick(close);

  return (
    <div className="relative">
      <TriggerComponent onClick={handleOpen} />
      {open ? (
        <ul ref={ref} className="absolute my-2 shadow-dropdown min-w-[120px]">
          {prismic.isFilled.group(menu) &&
            menu.map((item, index) => {
              console.log(item, "item in menu");
              return (
                <li className="bg-white" key={`dropdown_item_${index}`}>
                  <DropdownItem
                    index={index}
                    text={item.props.text}
                    selectedIndex={item.props.selectedIndex}
                    onItemSelect={() => {
                      onItemSelect(index);
                      close();
                    }}
                  />
                </li>
              );
            })}
        </ul>
      ) : null}
    </div>
  );
};
