const Pagination = ({ pagination, onPageChange }) => {
  const totalPages = Math.ceil(pagination.totalItem / pagination.pageSize);

  const handlePageChange = (newPage) => {
    if(newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        onClick={() => handlePageChange(pagination.page - 1)}
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={pagination.page === 1}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {pagination.page} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(pagination.page + 1)}
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={pagination.page === totalPages}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
