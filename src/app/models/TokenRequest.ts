export interface TokenRequest{
    grant_type: string;
    code: string;
    redirect_uri: string;
}