export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}


export interface TradeMark {
    id?: number,
    tmName: string,
    logoUrl: string,

}


export type Record = TradeMark[]

export interface TradeMarkResponseData extends ResponseData {
    data: {
        records: Record,
        total: number,
        size: number,
        current: number,
        searchCount: number,
        pages: number
    }
}