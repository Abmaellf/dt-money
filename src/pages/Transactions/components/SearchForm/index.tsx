import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
/**
 * Por que um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer);
 * - Props changed(mudou propriedades);
 * - Parent rendered (componente pai renderizaou)
 * 
 * Qual o fluxo de renderização?
 * 1. O React recria o HTML da interface do component
 * 2. Compara a versão do HTML recriada com a versão anterior
 * 3. Se mudou alguma coisa ele reescreve o HTML na tela
 * 
 * Memo:
 * 0. Hooks changed, Props changed (deep comparison)
 * 0.1 Comparar a versão anterior dos hooks e props
 * 0.2 SE mudou algo, ele vai permitir a nova renderização
 */

/*Validação e schema de todos os campos do formulario*/
const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>;

//  function SearchFormComponent() {
export function SearchForm() {

    const fetchTransactions  = useContextSelector(
        TransactionsContext,
         (context)=> {
        return context.fetchTransactions
    });

    const {
        register, /* retorna os dados do item definido no formulario que esta tipado como SearchFormInputs*/ 
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
// export const SearchForm = memo(SearchFormComponent);