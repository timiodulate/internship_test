interface EmptyStateProps {
	hasFilters: boolean;
	onClear: () => void;
}

export function EmptyState({ hasFilters, onClear }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-14 text-center">
			{/* Document icon */}
			<h3 className="text-sm font-semibold mb-1.5">
				{hasFilters ? "No matching records" : "No transactions"}
			</h3>
			<p className="text-xs text-zinc-500 mb-4 max-w-[280px]">
				{hasFilters
					? "Try adjusting your search or filter criteria."
					: "There are no transaction records to display."}
			</p>
			{hasFilters && (
				<button
					onClick={onClear}
					className="px-4 py-2 rounded-lg border text-sm"
				>
					Clear filters
				</button>
			)}
		</div>
	);
}
