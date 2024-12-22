
import React, { useState } from 'react';
import Pagination from './index';
import './pagination.css';

export default function PaginationTestApp() {
    const dummyTestData = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`
    }));
    // console.log({ dummyTestData });
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (currentPage) => {
        setCurrentPage(currentPage);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentListOfItems = dummyTestData.slice(indexOfFirstItem, indexOfLastItem);
    console.log({ currentListOfItems });
    return (
        <div>
            <h1>Pagination</h1>
            <ul className='list-items'>
                {
                    currentListOfItems.map((listItem) => (
                        <li key={listItem.id}>{listItem.name}</li>
                    ))
                }
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(dummyTestData.length / itemsPerPage)}
                onPageChange={onPageChange}
            />
        </div>
    )
}