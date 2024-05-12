<script lang="ts">
  import "~lib/styles/index.css"

  import Logo from "data-base64:~images/logo.svg"

  import Switch from "~lib/components/Switch.svelte"
  import { clientSideAccessToken } from "~lib/stores/clientSideAccessToken"
  import { serverSideAccessToken } from "~lib/stores/serverSideAccessToken"
</script>

<header>
  <img src={Logo} alt="CSM Logo" />
</header>

<section>
  <div>
    <Switch
      label="Fastest verification of trades"
      name="serverSide"
      bind:checked={$serverSideAccessToken}>
      <p>
        Before activating this, please understand the risks outlined in our
        help-center.
        <a class="redA" href="TODO" target="_blank">Learn more.</a>
      </p>
    </Switch>
  </div>
  <div>
    <Switch
      label="Client verification of trades"
      name="clientSide"
      bind:checked={$clientSideAccessToken}>
      <p>
        Risk-free, but for this to efficiently work, both the seller and buyer
        have to use it.
        <a href="TODO" target="_blank">Learn more.</a>
      </p>
    </Switch>
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
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  div + div {
    margin-top: 0.5rem;
  }

  section div p {
    margin-top: 3px;
    margin-bottom: 0px;
    font-family: "Satoshi";
    color: rgb(158 158 158);
    font-size: 0.8rem;
  }

  section div a {
    color: rgb(255, 255, 255);
  }

  .redA {
    color: rgb(255, 63, 63);
  }
</style>
