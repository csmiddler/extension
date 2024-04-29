<script lang="ts">
  import "./lib/styles/index.css"

  import Logo from "data-base64:~images/logo.svg"

  import Switch from "~lib/components/Switch.svelte"
  import { clientSideAccessToken } from "~lib/stores/clientSideAccessToken"
  import { serverSideAccessToken } from "~lib/stores/serverSideAccessToken"
</script>

<header>
  <img src={Logo} alt="CSM Logo" />
</header>

<section>
  <h1>Settings</h1>
  <div>
    <Switch
      label="Server-side access token"
      name="serveSide"
      bind:checked={$serverSideAccessToken} />
  </div>
  <div>
    <Switch
      label="Client-side access token"
      name="clientSide"
      bind:checked={$clientSideAccessToken} />
  </div>
</section>

<style>
  header {
    padding: 1rem;
    background-color: rgb(27 27 27);
  }

  img {
    height: 2.5rem;
  }

  section {
    padding: 1rem;
  }

  h1 {
    margin-bottom: 1rem;
  }

  div + div {
    margin-top: 0.5rem;
  }
</style>
