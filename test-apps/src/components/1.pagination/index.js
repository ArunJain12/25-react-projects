import React from 'react';

export default function Pagination({ currentPage, totalPages = 10, onPageChange }) {
    function generateNumberOfPages() {
        const pages = [];
        for (let i = 1; i <= totalPages; i++)
            pages.push(i);
        return pages;
    }
    return (
        <div className='pagination'>
            <button
                className='pagination-btn'
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>
            {generateNumberOfPages().map((pageNo) => (
                <button
                    className={`pagination-btn ${currentPage === pageNo ? 'active' :''}`}
                    onClick={() => onPageChange(pageNo)}
                >
                    {pageNo}
                </button>
            ))}
            <button
                className='pagination-btn'
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}