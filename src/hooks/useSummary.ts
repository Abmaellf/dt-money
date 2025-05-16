import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {

    const { transactions } = useContext(TransactionsContext)

    const summary = transactions.reduce(
        (acc, transaction)=> {
            if(transaction.type === 'income'){
                acc.income += transaction.price;
                acc.total += transaction.price;
            } else {
                acc.outcomo += transaction.price;
                acc.total -= transaction.price;
            }
            return acc;
        },
        {
            income: 0,
            outcomo: 0,
            total: 0
        }
    )
    return summary;
}