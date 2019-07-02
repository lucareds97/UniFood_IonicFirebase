import { Prodotto } from './prodotti';

export interface Ordine {
    dataOrdine: string;
    prezzo: number;
    stato: boolean;
    idCliente: string;
    prodotti: Prodotto[],
    idSede: string;
    isChecked: boolean,
    tipologia: string,
}
