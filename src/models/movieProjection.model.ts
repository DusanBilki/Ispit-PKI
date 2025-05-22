export interface MovieProjection {
    datum: string
    cena: Number
    status: 'rezervisano' | 'gledano' | 'otkazano'
}