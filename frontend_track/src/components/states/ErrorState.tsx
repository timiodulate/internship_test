interface ErrorStateProps {
	message: string;
	onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
	return (
		<div
			className="flex flex-col items-center justify-center py-14 text-center"
			role="alert"
		>
			<div className="w-13 h-13 rounded-xl flex items-center justify-center bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 mb-4">
				{/* X-circle SVG icon */}
			</div>
			<h3 className="text-sm font-semibold mb-1.5">
				Something went wrong
			</h3>
			<p className="text-xs text-zinc-500 mb-4 max-w-[280px]">
				{message}
			</p>
			<button
				onClick={onRetry}
				className="px-5 py-2 rounded-lg bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition"
				aria-label="Retry fetching transactions"
			>
				Retry
			</button>
		</div>
	);
}
