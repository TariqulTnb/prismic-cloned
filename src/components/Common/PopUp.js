import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { noto, montserrat } from "@/lib/fonts";
import clsx from "clsx";

export const PopUp = ({ children, open, handleClose }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* black background behind modal */}
          <div className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center laptop:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 tablet:translate-y-0 tablet:scale-95"
              enterTo="opacity-100 translate-y-0 tablet:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 tablet:scale-100"
              leaveTo="opacity-0 translate-y-4 tablet:translate-y-0 tablet:scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  montserrat.className,
                  noto.className,
                  "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all tablet:my-8 tablet:max-w-4xl laptop:max-w-5xl h-full w-full"
                )}
              >
                {/* inside media */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
