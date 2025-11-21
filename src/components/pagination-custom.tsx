"use client";

import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

import { useQueryParams } from "@/hooks/useQueryParams";

interface PaginationCustomProps {
  data: unknown[];
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  useUrlParams?: boolean;
}

const PaginationCustom = ({
  data,
  itemsPerPage = 6,
  onPageChange,
  currentPage: externalCurrentPage,
  useUrlParams = false,
}: PaginationCustomProps) => {
  const { updateParams, getParam } = useQueryParams();
  const [internalPage, setInternalPage] = useState(1);

  // Use external page (from URL) or internal state
  const currentPage = useUrlParams 
    ? (externalCurrentPage || Number(getParam("page")) || 1)
    : internalPage;

  useEffect(() => {
    if (useUrlParams && externalCurrentPage) {
      setInternalPage(externalCurrentPage);
    }
  }, [useUrlParams, externalCurrentPage]);

  // Calculate pagination values
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers with ellipsis logic
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (useUrlParams) {
      // Preserve all existing query params and update only page
      updateParams({ page: String(page) });
    } else {
      setInternalPage(page);
    }
    onPageChange?.(page);
    // Scroll to top of list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <p>No Data found.</p>
      </div>
    );
  }

  return (
    <>
      {totalPages > 1 && (
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevious}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {generatePageNumbers().map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <PaginationItem
                    key={`ellipsis-${currentPage}-${totalPages}-${index > 2 ? "end" : "start"}`}
                  >
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNext}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default PaginationCustom;
