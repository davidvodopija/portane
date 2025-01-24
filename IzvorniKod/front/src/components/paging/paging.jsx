import React, {useContext, useEffect, useState} from 'react';
import "./paging.css";

const Pagination = ({totalPages = 0, currentPage = 0, setCurrentPage}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    }, [currentPage, totalPages]);

    useEffect(() => {
        if (setCurrentPage) {
            setIsLoading(false);
        }
    }, [setCurrentPage]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const pagingLook = () => {
        let diff = totalPages - currentPage - 1;

        const handleClick = (page) => {
            if (page >= 0 && page <= totalPages - 1)
                setCurrentPage(page);
        };

        if (totalPages === 0) {
            return (
                <>
                    <li className="page-item current-pagee"><a className="page-link " href="#">-</a>
                    </li>
                </>
            )
        }
        if (totalPages === 1) {
            return (
                <>
                    <li className="page-item current-pagee"><a className="page-link " href="#"
                                                               onClick={() => handleClick(currentPage)}>{Number(currentPage) + 1}</a>
                    </li>
                </>
            )
        }

        if (diff === 0) {
            return (
                <>
                    {
                        (totalPages === 2) ? <></> : <li className="page-item"><a className="page-link" href="#"
                                                                                  onClick={() => handleClick(currentPage - 2)}>...</a>
                        </li>
                    }
                    <li className="page-item"><a className="page-link" href="#"
                                                 onClick={() => handleClick(currentPage - 1)}>{currentPage}</a></li>
                    <li className="page-item"><a className="page-link current-pagee" href="#"
                                                 onClick={() => handleClick(currentPage)}>{Number(currentPage) + 1}</a>
                    </li>
                </>
            );
        } else if (diff === 1) {
            return (
                <>
                    {
                        (totalPages === 2) ? <></> : <li className="page-item"><a className="page-link" href="#"
                                                                                  onClick={() => handleClick(currentPage - 1)}>...</a>
                        </li>
                    }

                    <li className="page-item"><a className="page-link current-pagee" href="#"
                                                 onClick={() => handleClick(currentPage)}>{Number(currentPage) + 1}</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#"
                                                 onClick={() => handleClick(Number(currentPage) + 1)}>{Number(currentPage) + 2}</a>
                    </li>
                </>
            );
        } else {
            return (
                <>
                    <li className="page-item current-pagee"><a className="page-link" href="#"
                                                               onClick={() => handleClick(currentPage)}>{Number(currentPage) + 1}</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#"
                                                 onClick={() => handleClick(Number(currentPage) + 1)}>{Number(currentPage) + 2}</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#"
                                                 onClick={() => handleClick(Number(currentPage) + 2)}>...</a></li>
                </>
            );
        }
    };

    return (
        <nav className="ms-4">
            <ul className="pagination w-25">
                <li className="page-item">
                    <a className="page-link" href="#" onClick={() => {
                        if (Number(currentPage) !== 0) setCurrentPage(currentPage - 1);
                    }}>
                        Previous
                    </a>
                </li>
                {pagingLook()}
                <li className="page-item">
                    <a className="page-link" href="#" onClick={() => {
                        if (Number(currentPage) + 1 < Number(totalPages)) setCurrentPage(currentPage + 1);
                    }}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
