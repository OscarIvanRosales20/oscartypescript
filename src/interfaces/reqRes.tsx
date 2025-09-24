
export interface ReqResListado{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Usuario[];
    support: Support;
}

export interface Usuario{
    id: string;
    Nombre:string;
    Correo: string;
}

export interface Support{
    url: string;
    text: string;
}