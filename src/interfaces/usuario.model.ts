import type IRepositorio from "./repositorio.model";

export default interface IUsuario {
    nome: string;
    login: string;
    avatar_url: string;
    perfil_url: string;
    repositorios_publicos: number;
    seguidores: number;
    repositorios_recentes: IRepositorio[];
}