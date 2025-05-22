import { MovieProjection } from "./movieProjection.model";
import { MovieReview } from "./movieReview";


export interface MovieModel {
    id:number,
    naziv: string,
    opis: string,
    zanr: string,
    trajanje: number,
    reziser: string,
    glumci: string[],
    datumIzlaska: number,
    projekcija: MovieProjection[],
    recenzije: MovieReview[],
    slika: string
}


/*
[
    {
        "id": 1,
        "naziv": "Hair",
        "opis": "Movie Hair with iconic music",
        "zanr": "War",
        "trajanje": 121,
        "reziser": "Milos Forman",
        "glumci": ["Treat Williams", "Donnie Dacus"],
        "datumIzlaska": 1979,
        "projekcija": [
            {"datum": "2025-05-10T19:00:00Z", "status":""}
        ],
        "recenzije":[
            {"Korisnik_1": "Korisnik 1", "ocena": 5,"komentar": "dirljiv film"}
        ],
        "slika": "/assets/img/hair.jpg"
    }
]
*/