import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";

export function Summary() {

    const { transactions } = useContext(TransactionContext)

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

    console.log(transactions)
    return(
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span> Entradas </span>
                    <ArrowCircleUp size={32} color="#00b37e" />
                </header>

                <strong> { priceFormatter.format(summary.income )} </strong>
            </SummaryCard>
            <SummaryCard>
                <header>
                    <span> Saidas </span>
                    <ArrowCircleDown size={32} color="#f75a68" />
                </header>

                <strong>  { priceFormatter.format(summary.outcomo) } </strong>
            </SummaryCard>
            <SummaryCard variant="green">
                <header>
                    <span> Total </span>
                    <CurrencyDollar size={32} color="#fff" />
                </header>

                <strong>  {priceFormatter.format(summary.total) }</strong>
            </SummaryCard>

        </SummaryContainer>
    )
}