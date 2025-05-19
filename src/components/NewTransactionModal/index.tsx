import  * as Dialog  from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

/*1º CRIAR O SCHEMA E VALIDAÇÃO DE TIPO DE VARIÁVEIS (STRING, NUMBER, UNUM ETC.)*/
const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

/*2º TYPAGEM DO FORMULARIO COM O TIPO DO SCHEMA DEFINIDO NO ZOD, ISSO IRA RETORNAR AS TIPAGENS DOS CAMPOS DO FORMULARIOS  */
type newTransactionFormaInputs = z.infer<typeof newTransactionFormSchema>; 


export function NewTransactionModal() {
    const  createTransactions  = useContextSelector(
        TransactionsContext, 
        (context) => {
         return context.createTransactions
    });

    /* 3º DESESTRUTURAR OS METODOS DO USEFORM QUE IREMOSUTILIZAR */
    /*O formulario será do tipo do type (newTransactionFormaInputs) que inferimos do schema newTransactionFormSchema*/
    const { 
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },  // 9º  receber do formState a informação(isSubmit=true) indicado quando o form esta em submição
        reset,
    } = useForm<newTransactionFormaInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })
    async function handleCreateNewTransaction(data: newTransactionFormaInputs) {/* 6º Criar a função com as regras, para serchamado no handleSubmit passado no onSubmit*/
         {/* await new Promise(resolve => setTimeout(resolve, 2000));                8º assinar a função como async para testes e criar o Promise com timeout para simular um atraso */}
       const { description, price, category, type} = data;

       await createTransactions({
         description, 
         price, 
         category, 
         type
       })
    
        reset();
    }               
    return(
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title> Nova Transação </Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>
               <form onSubmit={handleSubmit(handleCreateNewTransaction)}>  {/* 5º Chamar o metodo handleSubmit do useForm */} {/* 7º Informar a função dentro do handleSubmit (handleCreateNewTransaction)*/}
                     <input 
                        type="text"   
                        placeholder="Descrição" 
                        required
                        {...register('description')} /* 4º Chamar o register para cada valor input com o seu respesctivo schema */
                     />
                     <input 
                        type="number" 
                        placeholder="Preço"     
                        required
                        {...register('price', {valueAsNumber: true})} /* 4º Chamar o register para cada valor input com o seu respesctivo schema */
                     />
                     <input 
                        type="text"   
                        placeholder="Categoria" 
                        required
                        {...register('category')} /* 4º Chamar o register para cada valor input com o seu respesctivo schema */
                     />

                     <Controller
                        control={control}
                        name="type"
                        render={({field}) => {

                           console.log(field) 
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                        <TransactionTypeButton variant="income" value="income">
                                            <ArrowCircleUp size={24}/>
                                            Entrada
                                        </TransactionTypeButton>

                                        <TransactionTypeButton variant="outcome" value="outcome">
                                            <ArrowCircleDown size={24}/>
                                            Saida
                                        </TransactionTypeButton>
                                    
                                </TransactionType>
                            )
                        }}
                     />

                     <button type="submit" disabled={isSubmitting}> {/* 10º disibled - o botão estara desabilitado quando o isSubmint for true && Acessar os styles para definir o botão disabled */}
                        Cadastrar
                     </button>
                </form>

                
            </Content>
        </Dialog.Portal>
    )
}