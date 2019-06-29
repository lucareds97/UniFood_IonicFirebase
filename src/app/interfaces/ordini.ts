export interface Ordine {
    dataOrdine: string;
    orarioOrdine: string;
    prezzoTotale: string;
    stato: boolean;
    idCliente: string;
    idProdotto: string;
    idSede: string;
    isChecked: boolean,
    tipologia: string,
}
