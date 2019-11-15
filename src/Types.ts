export interface Character{
    id: number
}
export interface Story{
    title: string
}
export interface Response<entity> {
    status:number,
    data: {
        results: entity[]
    }
}