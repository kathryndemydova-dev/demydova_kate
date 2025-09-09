import ArrowButton from "./ArrowButton.tsx";

interface PaginationProps {
    visibleCount: number;
    totalClients: number;
    onPageChange: (pageNumber: number) => void;
    currentPage: number;
}

export const Pagination = ({ visibleCount, totalClients, onPageChange, currentPage }: PaginationProps) => {
    const totalPages = Math.max(1, Math.ceil(totalClients / visibleCount));
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const goToPage = (page: number) => {
        const clamped = Math.min(Math.max(page, 1), totalPages);
        if (clamped !== currentPage) onPageChange(clamped);
    };

    return (
        <ul className="pagination">
            <li className="page-item">
                <ArrowButton
                    direction="left"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                />
            </li>

            {pageNumbers.map((n) => (
                <li className="page-item" key={n}>
                    <button
                        type="button"
                        className={`page-link ${currentPage === n ? 'active' : ''}`}
                        onClick={() => onPageChange(n)}
                        aria-current={currentPage === n ? 'page' : undefined}
                    >
                        {n}
                    </button>
                </li>
            ))}

            <li className="page-item">
                <ArrowButton
                    direction="right"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                />
            </li>
        </ul>
    );
};

