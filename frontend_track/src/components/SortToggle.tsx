export default function SortToggle({
	order,
	onToggle,
}: {
	order: "asc" | "desc";
	onToggle: () => void;
}) {
	return (
		<button
			className="sort-btn"
			onClick={onToggle}
			aria-label={`Sort by ID ${order === "asc" ? "descending" : "ascending"}`}
			title={`Currently: ${order === "asc" ? "Ascending" : "Descending"}`}
		>
			<svg
				width="15"
				height="15"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{order === "asc" ? (
					<>
						<polyline points="18 15 12 9 6 15" />
						<line x1="12" y1="9" x2="12" y2="21" opacity="0.4" />
					</>
				) : (
					<>
						<polyline points="6 9 12 15 18 9" />
						<line x1="12" y1="3" x2="12" y2="15" opacity="0.4" />
					</>
				)}
			</svg>
			<span>ID {order === "asc" ? "↑" : "↓"}</span>
		</button>
	);
}
