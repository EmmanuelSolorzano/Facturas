import React from 'react';

const Pagination = ({ data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <div className="flex justify-center mt-4">
            <nav>
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li
                            key={index}
                            className={`${
                                currentPage === index + 1 ? 'active' : ''
                            } page-item`}
                        >
                            <button
                                onClick={() => handleClick(index + 1)}
                                className="page-link"
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
