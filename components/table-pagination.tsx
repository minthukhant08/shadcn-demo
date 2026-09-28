"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps {
  total: number;
  current_page: number;
  per_page: number;
}

export function AppPagination({ total, current_page, per_page }: DataTablePaginationProps) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / per_page));

  const updatePageParams = (newPage: number, newPerPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("per_page", newPerPage.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // --- ELLIPSIS LOGIC GENERATOR ---
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // Adjust this number to show more or fewer adjacent pages

    if (totalPages <= maxVisiblePages) {
      // If total pages is small, just show all of them
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      // Determine start and end indices around the active page
      let start = Math.max(2, current_page - 1);
      let end = Math.min(totalPages - 1, current_page + 1);

      // Pad boundary conditions
      if (current_page <= 2) {
        end = 4;
      }
      if (current_page >= totalPages - 1) {
        start = totalPages - 3;
      }

      // Add left ellipsis if needed
      if (start > 2) {
        pages.push("ellipsis-left");
      }

      // Push visible page range
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add right ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-right");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-2 py-4 border-t border-muted">
      {/* Left side info */}
      <div className="text-sm text-muted-foreground">
        Total {total} items
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-6">
        {/* Page Size selector */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${per_page}`}
            disabled={isPending}
            onValueChange={(value) => updatePageParams(1, Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={per_page} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 15, 20].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Numbered Page Buttons with Ellipses */}
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => updatePageParams(current_page - 1, per_page)}
            disabled={current_page <= 1 || isPending}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {getPageNumbers().map((pageItem, index) => {
            if (typeof pageItem === "string") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-8 w-8 items-center justify-center text-sm text-muted-foreground select-none"
                >
                  •••
                </span>
              );
            }

            return (
              <Button
                key={pageItem}
                variant={pageItem === current_page ? "default" : "outline"}
                className="h-8 w-8 p-0 text-sm"
                onClick={() => updatePageParams(pageItem, per_page)}
                disabled={isPending}
              >
                {pageItem}
              </Button>
            );
          })}

          {/* Next Button */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => updatePageParams(current_page + 1, per_page)}
            disabled={current_page >= totalPages || isPending}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}