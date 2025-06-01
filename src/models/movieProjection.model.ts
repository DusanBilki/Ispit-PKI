export interface MovieProjection {
    projekcija: Date
    datum: string
    cena: number
    status: 'rezervisano' | 'gledano' | 'otkazano'
}