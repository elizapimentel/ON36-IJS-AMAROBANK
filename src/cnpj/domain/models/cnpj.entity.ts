export class CnpjEntity {
    cnpj: string;
    razao_social: string;
    nome_fantasia: string;

    constructor(cnpj: string, razao_social: string, nome_fantasia: string) {
        this.cnpj = cnpj;
        this.razao_social = razao_social;
        this.nome_fantasia = nome_fantasia;
    }
}
