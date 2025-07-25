import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>Prev</button>
      <span style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>Next</button>
    </div>
  );
};

export default Pagination;
