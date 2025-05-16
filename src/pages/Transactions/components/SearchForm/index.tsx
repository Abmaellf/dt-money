import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

/*Validação e schema de todos os campos do formulario*/
const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {

    const { fetchTransactions  } = useContext(TransactionsContext);

    const {
        register, /* retorna os dados o item definido no formulario que esta tipado como SearchFormInputs*/ 
        handleSubmit, /*Metodo que chama dentro do onSubmit do formulario para chamra a funçãolocal*/
        formState: {isSubmitting} /* retorna true se o formulario esta em estado de submição*/
        
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    });

    async function handleSearchTransactions(data: SearchFormInputs) {
        //  await new Promise(resolve => setTimeout(resolve, 2000)) // console.log(data);
       
        await fetchTransactions(data.query)
    }
    
    return(
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações"
                {...register('query')}
            />

            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20}  />
                Buscar
            </button>
        </SearchFormContainer>
    )
}