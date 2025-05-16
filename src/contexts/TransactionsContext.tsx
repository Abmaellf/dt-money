import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";
interface Transaction {
    id: number;
    description:string;
    type: 'income' | 'outcome';
    price:number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderType {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType )


export function TransactionsProvider({children}:TransactionsProviderType) {
    
    //State de transações
    const [transactions, setTransactions ] = useState<Transaction[]>([]);
    
    //função assincrona que busca as transações da API via fetch e atualiza o state setTransactions com os dados retornado
    async function fetchTransactions(query?: string) {
        /*
        const url = new URL('/transactions');

        if(query) {
            url.searchParams.append('q', query);
        }
        console.log(url);

        
        const response = await fetch(url)
        const data = await response.json();
        */
        const response = await api.get('transactions', {
            params: {
                q: query
            }
        })
        
        setTransactions(response.data);
    } 
    
    // useEffect que executa apenas uma vez quando a pagina for renderizada
    useEffect(() => {
        fetchTransactions()
    }, [])

    return(
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}