export const Pagination = ({ pageCount, currentPage, setCurrentPage }) => {
  const handleLeftArrowClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="relative flex justify-center gap-x-10 items-center w-32 h-12 bg-menuBeigeDark overflow-scroll whitespace-nowrap">
      <button
        className="absolute left-0 h-12 pl-2 w-8 bg-menuBeigeDark"
        onClick={handleLeftArrowClick}
      >
        <svg
          width="14"
          height="21"
          viewBox="0 0 14 21"
          fill="none"
          className="inline"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector 74 (Stroke)"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.6081 0L14 3.18738L6.61211 10.5L14 17.8126L10.6081 21L0 10.5L10.6081 0Z"
            fill="rgba(59, 101, 82, 1)"
            fill-opacity="1"
          />
        </svg>
      </button>
      <div className="flex justify-center items-center gap-x-10 px-12 w-full">
        {currentPage} / {pageCount}
      </div>
      <button
        className="absolute right-0 bg-menuBeigeDark h-12 w-8 pr-2"
        onClick={handleRightArrowClick}
      >
        <svg
          width="14"
          height="21"
          viewBox="0 0 14 21"
          fill="none"
          className="inline"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Vector 74 (Stroke)"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.39191 21L1.6287e-06 17.8126L7.38789 10.5L3.5012e-07 3.18738L3.39191 -9.7996e-07L14 10.5L3.39191 21Z"
            fill="rgba(59, 101, 82, 1)"
            fill-opacity="1"
          />
        </svg>
      </button>
    </div>
  );
};
