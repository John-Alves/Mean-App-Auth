export interface User {
    name: string,
    email: string,
    telephone: string,
    cpf: string,
    
    login: string,
    password?: string
    
    token?: string,
    _id?: string,
}
