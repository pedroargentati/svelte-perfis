import type IRepositorio from "../interfaces/repositorio.model";
import type IUsuario from "../interfaces/usuario.model";

export default function prepareUserBody(userData: any, repositoriesData: any): IUsuario {
    const repositorios_recentes = repositoriesData.map((repo) => {
      return {
        nome: repo.name,
        url: repo.url
      } as IRepositorio
    });

    return  {
        avatar_url: userData.avatar_url,
        login: userData.login,
        nome: userData.name,
        perfil_url: userData.html_url,
        repositorios_publicos: userData.public_repos,
        seguidores: userData.followers,
        repositorios_recentes,
      }
}