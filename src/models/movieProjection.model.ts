export interface MovieProjection {
    datum: string
    cena: number
    status: 'rezervisano' | 'gledano' | 'otkazano'
}