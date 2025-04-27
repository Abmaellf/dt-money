import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {
    return(
        <div>
            <Header />
            <Summary />
            <TransactionsContainer>
                <TransactionsTable>
                    <tbody>
                        <tr>
                            <td  width="60%" > Desenvolvimento de sites </td>
                            
                                <td> 
                                    <PriceHighlight variant="income"> 
                                        R$ 59,00 
                                    </PriceHighlight> 
                                </td>
                            
                            <td> Venda</td>
                            <td> 13/04/2022 </td>
                        </tr>
                        <tr>
                            <td  width="6 0%"  > Hamburger</td>
                            <td> 
                                    <PriceHighlight variant="outcome"> 
                                        R$ 12,00 
                                    </PriceHighlight> 
                             </td>
                            <td> Alimentação </td>
                            <td> 13/04/2022 </td>
                        </tr>
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}