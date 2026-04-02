import type { TransactionRecord } from "@/types";

interface TransactionCardProps {
	transaction: TransactionRecord;
	onClick: () => void;
}

const TransactionCard = ({ transaction, onClick }: TransactionCardProps) => {
	// Truncate description to ~100 characters
	const truncatedDescription =
		transaction.description.length > 100
			? transaction.description.substring(0, 100) + "..."
			: transaction.description;

	return (
		<button
			onClick={onClick}
			aria-label={`Transaction ${transaction.transactionId} from Account ${transaction.accountId}`}
			className="w-full text-left p-4 border rounded-lg hover:shadow-md hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
		>
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<span className="font-semibold text-gray-900">
						#{transaction.transactionId}
					</span>
					<span className="text-sm text-gray-600">
						Acct #{transaction.accountId}
					</span>
				</div>
				<div className="font-medium text-gray-800">
					{transaction.reference}
				</div>
				<div className="text-sm text-gray-600">
					{truncatedDescription}
				</div>
			</div>
		</button>
	);
};

export default TransactionCard;
