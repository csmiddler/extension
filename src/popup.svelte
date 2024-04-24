<script lang="ts">
  import "./lib/styles/index.css"

  import Logo from "data-base64:~images/logo.svg"

  import Switch from "~lib/components/Switch.svelte"
  import { serverSideAccessToken } from "~lib/stores/serverSideAccessToken"
</script>

<header>
  <img src={Logo} alt="CSM Logo" />
</header>

<section>
  <h1>Settings</h1>
  <Switch
    label="Server-side access token"
    name="serveSide"
    bind:checked={$serverSideAccessToken} />
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
</style>
