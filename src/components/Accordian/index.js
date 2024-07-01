export function Accordian({ children }) {
  return (
    <div className="mx-auto">
      <dl className="mt-4 space-y-6 border-b border-[#656565] border-b-[#656565] pb-6">
        {children}
      </dl>
    </div>
  );
}

export default Accordian;
