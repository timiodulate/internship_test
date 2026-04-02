import type { TransactionRecord } from "@/types";

interface TransactionCardProps {
	transaction: TransactionRecord;
	onClick: () => void;
	isActive: boolean;
}

const TransactionCard = ({
	transaction,
	onClick,
	isActive,
}: TransactionCardProps) => {
	// Truncate description to ~100 characters
	const truncatedDescription =
		transaction.description.length > 100
			? transaction.description.substring(0, 100) + "..."
			: transaction.description;

	return (
		<button
			onClick={onClick}
			aria-label={`Transaction ${transaction.transactionId} from Account ${transaction.accountId}`}
			className={`block w-full text-left px-4 py-3.5 border border-[var(--border)] rounded-[10px] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all outline-none ${
				isActive
					? "border-[var(--accent)] bg-[var(--accent-subtle)]"
					: "hover:bg-[var(--bg-surface-hover)] hover:border-[var(--text-tertiary)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:ring-3 focus-visible:ring-[var(--focus-ring)] focus-visible:border-[var(--accent)]"
			}`}
		>
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center justify-between mb-1.5">
					<span className="font-jetbrains-mono text-xs font-medium text-[var(--accent)]">
						#{transaction.transactionId}
					</span>
					<span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--badge-text)]">
						Acct #{transaction.accountId}
					</span>
				</div>
				<div className="text-sm font-medium leading-[1.4] text-[var(--text-primary)] mb-1">
					{transaction.reference}
				</div>
				<div className="text-[12.5px] text-[var(--text-secondary)] leading-[1.45]">
					{truncatedDescription}
				</div>
			</div>
		</button>
	);
};

export default TransactionCard;
