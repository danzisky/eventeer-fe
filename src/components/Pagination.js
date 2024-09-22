import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ pagination = {}, onPageChange }) => {
  const { currentPage = 1, totalPages = 0 } = pagination;

  // Function to handle page number click
  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => onPageChange(index),
  });

  const next = () => {
    if (currentPage < totalPages) {
      onPageChange(parseInt(currentPage) + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(parseInt(currentPage) - 1);
    }
  };

  const pageNumbers = []; // Pages array
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="green"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {pageNumbers.map((page) => (
          <IconButton color="green" key={page} {...getItemProps(page)}>
            {page}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        color="green"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
