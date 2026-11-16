import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // How many numbers to show on each side of the active page
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  // Guard clause if there is only 1 page or none
  if (totalPages <= 1) return null;

  // Helper utility function to generate structural page ranges
  const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const generatePaginationPages = () => {
    // Total pages to show calculated dynamically (siblings + current + first + last + ellipses)
    const totalPageNumbers = siblingCount + 5;

    // Case 1: If total pages is less than the page numbers we want to show, return the entire range
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: Show right ellipses only
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let itemRangeCount = 3 + 2 * siblingCount;
      let leftRange = range(1, itemRangeCount);
      return [...leftRange, "...", lastPageIndex];
    }

    // Case 3: Show left ellipses only
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let itemRangeCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPages - itemRangeCount + 1, totalPages);
      return [firstPageIndex, "...", ...rightRange];
    }

    // Case 4: Show both left and right ellipses
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return [];
  };

  const paginationRange = generatePaginationPages();

  return (
    <div className="flex items-center justify-between border-t border-lightborder bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg select-none">
      {/* Mobile Context Layout Toggle Displays */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="relative inline-flex items-center rounded-md border border-lightborder bg-white px-4 py-2 text-xs font-medium text-dark/70 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-lightborder bg-white px-4 py-2 text-xs font-medium text-dark/70 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      {/* Desktop Rich Layout Component Controls Frame */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-dark/60">
            Showing Page{" "}
            <span className="font-semibold text-dark">{currentPage}</span> of{" "}
            <span className="font-semibold text-dark">{totalPages}</span> Pages
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-xs bg-white"
            aria-label="Pagination"
          >
            {/* Previous Action Trigger Arrow */}
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="relative inline-flex items-center rounded-l-md border border-lightborder bg-white p-2 text-dark/60 hover:bg-gray-50 focus:z-20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft size={16} />
            </button>

            {/* Render Calculated Page Index Arrays */}
            {paginationRange.map((pageNumber, idx) => {
              // Ellipses Display Component Guard
              if (pageNumber === "...") {
                return (
                  <span
                    key={`dots-${idx}`}
                    className="relative inline-flex items-center border border-lightborder bg-white px-3.5 py-2 text-xs font-medium text-dark/40"
                  >
                    ...
                  </span>
                );
              }

              const isActive = pageNumber === currentPage;

              return (
                <button
                  key={`page-${pageNumber}`}
                  onClick={() => onPageChange(Number(pageNumber))}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex items-center border px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer focus:z-20 ${
                    isActive
                      ? "z-10 bg-orange-500 border-orange-500 text-white font-semibold"
                      : "bg-white border-lightborder text-dark/70 hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next Action Trigger Arrow */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="relative inline-flex items-center rounded-r-md border border-lightborder bg-white p-2 text-dark/60 hover:bg-gray-50 focus:z-20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <span className="sr-only">Next</span>
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
