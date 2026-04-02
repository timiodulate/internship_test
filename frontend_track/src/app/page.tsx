"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useDebounce } from "@/hooks/useDebounce";
import { filterTransactions } from "@/utils/filter";
import type { TransactionRecord } from "@/types";
import { SearchBar } from "@/components/SearchBar";
import AccountFilter from "@/components/AccountFilter";
import TransactionCard from "@/components/TransactionCard";
import TransactionDetail from "@/components/TransactionDetail";
import { LoadingSkeleton } from "@/components/states/LoadingSkeleton";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";
import Pagination from "@/components/Pagination";
import SortToggle from "@/components/SortToggle";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useTheme } from "@/hooks/useTheme";

const ITEMS_PER_PAGE = 10;

export default function Page() {
	const { theme } = useTheme();
	const { state, retry } = useTransactions();
	const [searchRaw, setSearchRaw] = useState("");
	const searchQuery = useDebounce(searchRaw, 300);
	const [accountFilter, setAccountFilter] = useState<string>("all");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(
		null,
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [dark, setDark] = useState(true);

	const listRef = useRef<HTMLDivElement>(null);

	const transactions = state.status === "success" ? state.data : [];
	const accountIds = useMemo(
		() =>
			[...new Set(transactions.map((t) => t.accountId))].sort(
				(a, b) => a - b,
			),
		[transactions],
	);

	const filtered = useMemo(
		() =>
			filterTransactions(
				transactions,
				searchQuery,
				accountFilter,
				sortOrder,
			),
		[transactions, searchQuery, accountFilter, sortOrder],
	);

	const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
	const paginated = filtered.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	// Check if there are filters applied
	const hasFilters = searchQuery.trim() !== "" || accountFilter !== "all";

	const resetPage = () => {
		setCurrentPage(1); // Reset page on filter change
	};

	const handleSearchChange = (value: string) => {
		setSearchRaw(value);
		resetPage();
	};

	const handleAccountFilterChange = (val: string) => {
		setAccountFilter(val);
		resetPage();
	};

	const handleSortToggle = () => {
		setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
		resetPage();
	};

	const clearFilters = () => {
		setSearchRaw("");
		setAccountFilter("all");
		resetPage(); // also reset here
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		if (listRef.current) {
			listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return (
		<div className={`${theme == "dark" ? "dark" : "light"}`}>
			<main className="max-w-[820px] my-0 mx-auto pt-[32px] px-5 pb-12">
				<div className="flex items-center justify-between mb-6">
					<div className="brand flex items-baseline gap-2.5">
						<h1 className="text-xl font-bold text-[var(--text-primary)]">
							TaxStreem
						</h1>

						<span className="font-jetbrains-mono text-xs font-medium !py-0.5 !px-2 border rounded-sm bg-[var(--accent)] text-white uppercase ">
							Transactions
						</span>
					</div>

					<DarkModeToggle />
				</div>

				{selectedTx ? (
					<TransactionDetail
						transaction={selectedTx}
						onBack={() => setSelectedTx(null)}
					/>
				) : (
					<>
						{state.status === "success" && (
							<>
								<div className="flex gap-2.5 mb-4 flex-wrap items-stretch">
									<SearchBar
										value={searchRaw}
										onChange={handleSearchChange}
									/>

									<AccountFilter
										accounts={accountIds}
										value={accountFilter}
										onChange={handleAccountFilterChange}
									/>

									<SortToggle
										order={sortOrder}
										onToggle={handleSortToggle}
									/>
								</div>

								<p className="text-xs text-[var(--text-tertiary)] mb-2.5 font-medium">
									{filtered.length} record
									{filtered.length !== 1 ? "s" : ""}
									{hasFilters ? " found" : " total"}
									{totalPages > 1
										? ` · Page ${currentPage} of ${totalPages}`
										: ""}
								</p>
							</>
						)}

						<div ref={listRef}>
							{state.status === "loading" && <LoadingSkeleton />}

							{state.status === "error" && (
								<ErrorState
									message={state.message}
									onRetry={retry}
								/>
							)}

							{state.status === "success" &&
								filtered.length === 0 && (
									<EmptyState
										hasFilters={hasFilters}
										onClear={clearFilters}
									/>
								)}

							{state.status === "success" &&
								filtered.length > 0 && (
									<>
										<div className="flex flex-col gap-1.5 mb-5">
											{paginated.map((tx) => (
												<TransactionCard
													key={tx.transactionId}
													transaction={tx}
													onClick={() =>
														setSelectedTx(tx)
													}
													isActive={false}
												/>
											))}
										</div>

										<Pagination
											currentPage={currentPage}
											totalPages={totalPages}
											onPageChange={handlePageChange}
										/>
									</>
								)}
						</div>
					</>
				)}
			</main>
		</div>
	);
}
