export const SearchBar = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (newValue: string) => void;
}) => {
	return (
		<div className="relative flex items-center flex-1 min-w-[200px]">
			{/* Search Icon */}
			<div className="absolute left-3 text-[var(--text-tertiary)] pointer-events-none">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>
			</div>

			{/* Input */}
			<input
				type="text"
				placeholder="Search transactions..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				aria-label="Search transactions"
				className="w-full px-9 py-[9px] border border-[var(--border)] rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13.5px] outline-none transition-[border,box-shadow] focus:border-[var(--accent)] focus:ring-3 focus:ring-[var(--focus-ring)] placeholder:text-[var(--text-tertiary)]"
			/>

			{/* Clear Button */}
			{value && (
				<button
					onClick={() => onChange("")}
					aria-label="Clear search"
					className="absolute right-2 flex items-center justify-center w-[22px] h-[22px] rounded border-0 bg-[var(--bg-muted)] text-[var(--text-secondary)] transition-all hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			)}
		</div>
	);
};
