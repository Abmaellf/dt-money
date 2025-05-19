import {  ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
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
    createTransactions: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderType {
    children: ReactNode;
}

interface CreateTransactionInput {
   description: string;
	price: number;
    category: string; 
	type: 'income' | 'outcome'
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as TransactionContextType )


export function TransactionsProvider({children}:TransactionsProviderType) {
    
    //State de transações
    const [transactions, setTransactions ] = useState<Transaction[]>([]);
    
    //função assincrona que busca as transações da API via fetch e atualiza o state setTransactions com os dados retornado
   /* SEM O USECALLBACK async function fetchTransactions(query?: string) {
        //   const url = new URL('/transactions');
        //     if(query) {
        //         url.searchParams.append('q', query);
        //  }
        //      console.log(url);
        //      const response = await fetch(url)
        //      const data = await response.json(); 

        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order:  'desc',
                q: query,
            }
        })
        
        setTransactions(response.data);
    } 
    */

   /* async function createTransactions(data: CreateTransactionInput) {
        const { description, price, category, type} = data;
        const response =  await api.post('transactions', {
			    description,
			    price,
			    category,
			    type,
			    createdAt: new Date(),
			})
			setTransactions(state => [response.data, ...state ])
    }*/

        const fetchTransactions = useCallback(async (query?: string) => {
        /*  const url = new URL('/transactions');
            if(query) {
                url.searchParams.append('q', query);
         }
             console.log(url);
             const response = await fetch(url)
             const data = await response.json(); */

        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order:  'desc',
                q: query,
            }
        })
        setTransactions(response.data);
    },[] )


    const createTransactions = useCallback(async (data: CreateTransactionInput)  => {
        const { description, price, category, type} = data;
        const response =  await api.post('transactions', {
			    description,
			    price,
			    category,
			    type,
			    createdAt: new Date(),
			})
			setTransactions(state => [response.data, ...state ])
    }, [])
    
    // useEffect que executa apenas uma vez quando a pagina for renderizada
    useEffect(() => {
        fetchTransactions()
    }, [])

    return(
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}