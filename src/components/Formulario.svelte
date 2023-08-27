<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type IUsuario from "../interfaces/usuario.model";
  import { getRepositories, getUser } from "../requests";
  import prepareUserBody from "../utils/prepareUserBody";

  let inputValue = "";
  let errorStatus: number | null = null;

  const dispatch = createEventDispatcher<{
    onUpdateUser: IUsuario | null;
  }>();

  async function onSubmit() {
    const userResponse = await getUser(inputValue);
    const responseRepositories = await getRepositories(inputValue);

    if (userResponse.ok && responseRepositories.ok) {
      const userData = await userResponse.json();
      const repositoriesData = await responseRepositories.json();

      errorStatus = null;

      // dispara o evento personalizado 'onUpdateUser'.
      dispatch("onUpdateUser", prepareUserBody(userData, repositoriesData));
    } else {
      errorStatus = userResponse.status;
      dispatch("onUpdateUser", null);
    }
  }
</script>

<form action="" on:submit|preventDefault={onSubmit}>
  <input
    type="text"
    placeholder="Pesquise o usuário"
    class="input"
    class:erro-input={errorStatus === 404}
    bind:value={inputValue}
  />
  {#if errorStatus === 404}
    <span class="erro">Usuário não encontrado !</span>
  {/if}
  <div class="botao-container">
    <button type="submit" class="botao">Buscar</button>
  </div>
</form>

<style>
  .input {
    padding: 15px 25px;
    width: calc(100% - 8.75rem);
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #2e80fa;
    box-shadow: 0px 17px 52px rgba(222, 231, 247, 0.4);
    outline: 0;
  }

  .input::placeholder {
    font-family: "Roboto";
    font-style: italic;
    font-weight: 300;
    font-size: 19.5px;
    line-height: 26px;
    color: #6e8cba;
  }

  .erro {
    position: absolute;
    bottom: -25px;
    left: 0;
    font-style: italic;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    z-index: -1;
    color: #ff003e;
  }

  .erro-input {
    border: 1px solid #ff003e;
  }

  .botao-container {
    position: absolute;
    width: 9.625rem;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
  }

  .botao {
    padding: 15px 24px;
    border-radius: 8px;
    border: none;
    background: #2e80fa;
    line-height: 26px;
    color: #fff;
    font-size: 22px;
    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    gap: 13px;
  }
  .botao:hover {
    background: #4590ff;
  }
</style>
