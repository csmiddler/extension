<script lang="ts">
  import "./lib/styles/index.css"

  import Logo from "data-base64:~images/logo.svg"
</script>

<header>
  <img src={Logo} alt="CSM Logo" />
</header>

<section>
  <h1>Settings</h1>
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
