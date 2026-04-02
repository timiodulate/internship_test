interface AccountFilterProps {
	accounts: number[];
	// value: number | null;
	value: string | null;
	onChange: (accountId: string) => void;
}

const AccountFilter = ({ accounts, value, onChange }: AccountFilterProps) => {
	// Extract unique account IDs and sort numerically
	const uniqueAccountIds = [...new Set(accounts.map((acc) => acc))].sort(
		(a, b) => a - b,
	);

	return (
		<div className="flex items-center gap-0">
			<label htmlFor="account-filter" className="text-xs font-medium text-[var(--text-tertiary)] py-[9px] pl-3 pr-0 bg-[var(--bg-surface)] border border-[var(--border)] border-r-0 rounded-l-lg whitespace-nowrap">
				Account
			</label>

			<select
				id="account-filter"
				value={value ?? ""}
				onChange={(e) =>
					onChange(e.target.value ? e.target.value : "all")
				}
				aria-label="Filter by account ID"
				className="py-[9px] pl-2 pr-7 border border-[var(--border)] border-l-0 rounded-r-lg bg-[var(--bg-surface)] text-[var(--text-primary)] text-[13.5px] outline-none appearance-auto cursor-pointer transition-[border,box-shadow] focus:border-[var(--accent)] focus:ring-3 focus:ring-[var(--focus-ring)]"
			>
				<option value="">All accounts</option>

				{uniqueAccountIds.map((accountId) => (
					<option key={accountId} value={accountId}>
						Account {accountId}
					</option>
				))}
			</select>
		</div>
	);
};

export default AccountFilter;
