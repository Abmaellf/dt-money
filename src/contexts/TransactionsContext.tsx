import { createContext, ReactNode, useEffect, useState } from "react";
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
}

interface TransactionsProviderType {
    children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType )


export function TransactionsProvider({children}:TransactionsProviderType) {
    
    //State de transações
    const [transactions, setTransactions ] = useState<Transaction[]>([]);
    
    //função assincrona que busca as transações da API via fetch e atualiza o state setTransactions com os dados retornado
    async function loadTransactions() {
        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json();
        
            setTransactions(data);
    } 
    
    // useEffect que executa apenas uma vez quando a pagina for renderizada
    useEffect(() => {
        loadTransactions()
    }, [])

    return(
        <TransactionContext.Provider value={{transactions}}>
            {children}
        </TransactionContext.Provider>
    )
}