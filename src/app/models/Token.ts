export interface Token{
    access_token: string;
    token_type: string;
    name: string;
    expires_in: number;
    issued: Date;
    expires: Date;
}