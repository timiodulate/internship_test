import type { TransactionRecord } from "@/types";

interface AccountFilterProps {
	transactions: TransactionRecord[];
	value: number | null;
	onChange: (accountId: number | null) => void;
}

const AccountFilter = ({
	transactions,
	value,
	onChange,
}: AccountFilterProps) => {
	// Extract unique account IDs and sort numerically
	const uniqueAccountIds = [
		...new Set(transactions.map((t) => t.accountId)),
	].sort((a, b) => a - b);

	return (
		<select
			value={value ?? ""}
			onChange={(e) =>
				onChange(e.target.value ? Number(e.target.value) : null)
			}
			aria-label="Filter by account"
			className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			<option value="">All accounts</option>
			{uniqueAccountIds.map((accountId) => (
				<option key={accountId} value={accountId}>
					Account {accountId}
				</option>
			))}
		</select>
	);
};

export default AccountFilter;
