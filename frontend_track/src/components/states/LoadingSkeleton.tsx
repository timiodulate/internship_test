const skeletonWidths = Array.from({ length: 6 }, () => ({
	width1: `${60 + Math.random() * 30}%`,
	width2: `${30 + Math.random() * 25}%`,
}));

export function LoadingSkeleton() {
	return (
		<div
			className="flex flex-col gap-3"
			role="status"
			aria-label="Loading transactions"
		>
			{/* {skeletonRows.map((row, i) => ( */}
			{skeletonWidths.map((row, i) => (
				<div
					key={i}
					className="flex items-center gap-3.5 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-pulse"
				>
					<div className="w-11 h-5 rounded bg-zinc-200 dark:bg-zinc-800 shrink-0" />
					<div className="flex-1 flex flex-col gap-1.5">
						<div
							className="h-3.5 rounded bg-zinc-200 dark:bg-zinc-800"
							style={{ width: row.width1 }}
						/>
						<div
							className="h-3 rounded bg-zinc-200 dark:bg-zinc-800"
							style={{ width: row.width2 }}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
