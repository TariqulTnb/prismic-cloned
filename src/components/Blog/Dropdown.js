import React from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export const Dropdown = ({
  trigger: TriggerComponent,
  menu,
  onItemSelect,
  open,
  setOpen,
}) => {
  const handleOpen = () => {
    setOpen(!open);
  };

  const close = () => {
    setOpen(false);
  };

  const handleOnItemSelect = (text) => {
    onItemSelect(text);
    close();
  };

  const ref = useOutsideClick(close);

  return (
    <div className="relative">
      <TriggerComponent onClick={handleOpen} />
      {open ? (
        <ul
          ref={ref}
          className="z-50 absolute my-2 rounded-[100px] shadow-dropdown w-[300px] tablet:w-[491px] -translate-x-8 tablet:-translate-x-32"
        >
          {menu.map((item, index) => {
            return (
              <DropdownItem
                key={index}
                text={item}
                index={index}
                onItemSelect={handleOnItemSelect}
              />
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

const DropdownItem = ({ text, index, onItemSelect }) => {
  const handleClick = () => {
    onItemSelect(text);
  };
  return (
    <div
      as="button"
      onClick={handleClick}
      className="px-4 py-3 text-sm h-full w-full text-left cursor-pointer bg-white hover:bg-menuBeigeDark"
    >
      {index + 1}.<span className="ml-2">{text}</span>
    </div>
  );
};
