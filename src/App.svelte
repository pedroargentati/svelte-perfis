<script lang="ts">
  import Formulario from "./components/Formulario.svelte";
  import Titulo from "./components/Titulo.svelte";
  import Usuario from "./components/Usuario.svelte";
  import type IUsuario from "./interfaces/usuario.model";

  let usuario: IUsuario | null = null;

  function defineUser(event: CustomEvent<IUsuario | null>) {
    usuario = event.detail;
  }
</script>

<div class="app">
  <header>
    <Titulo />

    <div class="busca-usuario">
      <Formulario on:onUpdateUser={defineUser} />
    </div>
  </header>

  {#if usuario}
    <Usuario {usuario} />
  {/if}
</div>

<style>
  .app {
    max-height: 100vh;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .busca-usuario {
    position: relative;
    width: 70%;
  }
</style>
