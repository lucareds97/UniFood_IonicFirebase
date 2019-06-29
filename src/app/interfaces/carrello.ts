import { Prodotto } from './prodotti';

export interface Carrello {
    idCliente: string;
    prodotti: Prodotto[];
    Prezzo: number,
}