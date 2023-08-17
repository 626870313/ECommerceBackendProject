export interface ResponseData {
    code:number,
    message:string,
    ok:boolean
}

export interface CategoryObj {
    id:number | string,
    name:string,
    categort1Id?:number,
    categort2Id?:number,
}

export interface CategoryResponseData extends ResponseData {
    data:CategoryObj[]
}


export interface AttrValue {
    id?:number,
    valueName:string,
    attrId?:number
}


export type AttrValueList = AttrValue[]

export interface Attr {
    id?:number,
    attrName:string,
    categoryId:number|string,
    categoryLevel:number,
    attrValueList:AttrValueList
}


export type AttrList = Attr[]



export interface AttrResponseData extends ResponseData{
    data: Attr[]
}