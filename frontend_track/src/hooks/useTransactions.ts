import { useReducer, useCallback, useEffect } from "react";
import type { TransactionRecord, AsyncState, RawPost } from "@/types";

type Action =
	| { type: "FETCH_START" }
	| { type: "FETCH_SUCCESS"; payload: TransactionRecord[] }
	| { type: "FETCH_ERROR"; payload: string };

function reducer(
	_state: AsyncState<TransactionRecord[]>,
	action: Action,
): AsyncState<TransactionRecord[]> {
	switch (action.type) {
		case "FETCH_START":
			return { status: "loading" };
		case "FETCH_SUCCESS":
			return { status: "success", data: action.payload };
		case "FETCH_ERROR":
			return { status: "error", message: action.payload };
		default:
			return { status: "idle" };
	}
}

export function useTransactions() {
	const [state, dispatch] = useReducer(reducer, { status: "idle" });

	const fetchTransactions = useCallback(async () => {
		dispatch({ type: "FETCH_START" });
		try {
			const res = await fetch(
				"https://jsonplaceholder.typicode.com/posts",
			);

			if (!res.ok)
				throw new Error(`HTTP ${res.status}: ${res.statusText}`);

			const data = await res.json();
			const mapped: TransactionRecord[] = data.map((post: RawPost) => ({
				id: post.id,
				accountId: post.userId,
				reference: post.title,
				description: post.body,
			}));
			dispatch({ type: "FETCH_SUCCESS", payload: mapped });
		} catch (err) {
			dispatch({
				type: "FETCH_ERROR",
				payload:
					err instanceof Error
						? err.message
						: "Failed to fetch transactions",
			});
		}
	}, []);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	return { state, retry: fetchTransactions };
}
