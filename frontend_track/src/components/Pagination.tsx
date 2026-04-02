export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}) {
	if (totalPages <= 1) return null;

	const pages = [];
	const maxVisible = 5;
	let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
	const end = Math.min(totalPages, start + maxVisible - 1);
	if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

	for (let i = start; i <= end; i++) pages.push(i);

	return (
		<nav
			className="flex justify-center gap-2"
			// role="navigation"
			aria-label="Transaction pages"
		>
			<button
				className="flex items-center justify-center border border-[var(--border)] rounded-md size-8 text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] disabled:opacity-35 disabled:cursor-not-allowed"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label="Previous page"
			>
				‹
			</button>

			{start > 1 && (
				<>
					<button
						className="flex items-center justify-center border border-[var(--border)] rounded-md size-8 text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] disabled:opacity-35 disabled:cursor-not-allowed"
						onClick={() => onPageChange(1)}
					>
						1
					</button>
					{start > 2 && <span className="page-ellipsis">…</span>}
				</>
			)}

			{pages.map((p) => (
				<button
					key={p}
					className={`flex items-center justify-center border border-[var(--border)] rounded-md size-8 text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] disabled:opacity-35 disabled:cursor-not-allowed ${p === currentPage ? "active" : ""}`}
					onClick={() => onPageChange(p)}
					aria-current={p === currentPage ? "page" : undefined}
					aria-label={`Page ${p}`}
				>
					{p}
				</button>
			))}
			{end < totalPages && (
				<>
					{end < totalPages - 1 && (
						<span className="page-ellipsis">…</span>
					)}
					<button
						className="flex items-center justify-center border border-[var(--border)] rounded-md size-8 text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] disabled:opacity-35 disabled:cursor-not-allowed"
						onClick={() => onPageChange(totalPages)}
					>
						{totalPages}
					</button>
				</>
			)}

			<button
				className="flex items-center justify-center border border-[var(--border)] rounded-md size-8 text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] disabled:opacity-35 disabled:cursor-not-allowed"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label="Next page"
			>
				›
			</button>
		</nav>
	);
}
