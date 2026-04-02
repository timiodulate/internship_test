const SearchBar = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (newValue: string) => void;
}) => {
	return (
		<div className="relative flex items-center">
			{/* Search Icon */}
			<div className="absolute left-3 text-gray-400 pointer-events-none">
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
				className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			{/* Clear Button */}
			{value && (
				<button
					onClick={() => onChange("")}
					aria-label="Clear search"
					className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1 transition-colors"
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
