function getUser(userName: string) {
    return fetch(
      `https://api.github.com/users/${userName}`
    );
}

function getRepositories(userName: string) {
    return fetch(
      `https://api.github.com/users/${userName}/repos?sort=created&per_page=5`
    );
}

export { getUser, getRepositories };