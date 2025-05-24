export interface MovieProjection {
    projekcija: Date
    datum: string
    cena: Number
    status: 'rezervisano' | 'gledano' | 'otkazano'
}