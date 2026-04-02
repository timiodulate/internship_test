import type { TransactionRecord } from "@/types";

export type SortOrder = "asc" | "desc";

export function filterTransactions(
	transactions: TransactionRecord[],
	searchQuery: string,
	accountFilter: string,
	sortOrder: SortOrder,
): TransactionRecord[] {
	let result = [...transactions];

	if (accountFilter !== "all") {
		result = result.filter((t) => t.accountId === Number(accountFilter));
	}

	if (searchQuery.trim()) {
		const q = searchQuery.toLowerCase();
		result = result.filter(
			(t) =>
				t.reference.toLowerCase().includes(q) ||
				t.description.toLowerCase().includes(q),
		);
	}

	result.sort((a, b) =>
		sortOrder === "asc"
			? a.transactionId - b.transactionId
			: b.transactionId - a.transactionId,
	);

	return result;
}
