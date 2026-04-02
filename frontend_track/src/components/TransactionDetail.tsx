import type { TransactionRecord } from "@/types";

interface TransactionDetailProps {
	transaction: TransactionRecord;
	onBack: () => void;
}

const TransactionDetail = ({ transaction, onBack }: TransactionDetailProps) => {
	return (
		<div className="detail-panel animate-in fade-in duration-300">
			{/* Back Button */}
			<button
				onClick={onBack}
				aria-label="Go back to transactions list"
				className="inline-flex items-center gap-1.5 px-3 py-1.5 pl-2 mb-5 border border-[var(--border)] rounded-lg bg-[var(--bg-surface)] text-[var(--text-secondary)] text-xs font-medium transition-all hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-3 focus:ring-[var(--focus-ring)] focus:border-[var(--accent)]"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M19 12H5M12 19l-7-7 7-7" />
				</svg>
				Back
			</button>

			{/* Detail Card */}
			<div className="detail-content bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl px-6 py-6 shadow-[var(--shadow-md)]">
				{/* Transaction ID */}
				<div className="detail-section mb-5">
					<label className="detail-label block text-[11px] font-semibold uppercase tracking-[0.6px] text-[var(--text-tertiary)] mb-1.5">
						Transaction ID
					</label>
					<div className="detail-value font-jetbrains-mono text-sm font-medium text-[var(--text-primary)]">
						{transaction.transactionId}
					</div>
				</div>

				{/* Account ID */}
				<div className="detail-section mb-5">
					<label className="detail-label block text-[11px] font-semibold uppercase tracking-[0.6px] text-[var(--text-tertiary)] mb-1.5">
						Account ID
					</label>
					<div className="detail-value font-jetbrains-mono text-sm font-medium text-[var(--text-primary)]">
						{transaction.accountId}
					</div>
				</div>

				{/* Reference */}
				<div className="detail-section mb-5">
					<label className="detail-label block text-[11px] font-semibold uppercase tracking-[0.6px] text-[var(--text-tertiary)] mb-1.5">
						Reference
					</label>
					<div className="detail-value text-sm font-medium text-[var(--text-primary)]">
						{transaction.reference}
					</div>
				</div>

				{/* Description */}
				<div className="detail-section">
					<label className="detail-label block text-[11px] font-semibold uppercase tracking-[0.6px] text-[var(--text-tertiary)] mb-1.5">
						Description
					</label>
					<div className="detail-value text-sm leading-relaxed text-[var(--text-primary)] whitespace-pre-wrap">
						{transaction.description}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransactionDetail;
