<script lang="ts">
  export let name: string
  export let label: string | undefined = undefined
  export let checked: boolean
</script>

<label for={name}>
  {#if label}
    {label}
  {/if}
  <input id={name} {name} type="checkbox" role="switch" bind:checked />
</label>

<style>
  label {
    cursor: pointer;
  }

  input {
    --transtion: 0.2s ease-in-out;

    transition:
      background-color var(--transition),
      border-color var(--transition),
      color var(--transition);
  }

  [type="checkbox"][role="switch"] {
    --switch-background-color: rgb(57 57 57);
    --switch-color: #fff;
    --border-width: 3px;
    --background-color: var(--switch-background-color);
    --border-color: var(--switch-background-color);
    --color: var(--switch-color);
    --switch-checked-background-color: rgb(230 138 0);

    width: 2.5em;
    height: 1.5em;
    border: var(--border-width) solid var(--border-color);
    border-radius: 1.5em;
    background-color: var(--background-color);
    line-height: 1.5em;
    padding: 0;
    appearance: none;
    margin-top: -0.125em;
    margin-inline-start: 0;
    margin-inline-end: 0.375em;
    border-width: var(--border-width);
    font-size: inherit;
    vertical-align: middle;
    cursor: pointer;
  }

  [type="checkbox"][role="switch"]:checked {
    --background-color: var(--switch-checked-background-color);
    --border-color: var(--switch-checked-background-color);
  }

  [type="checkbox"][role="switch"]::before {
    display: block;
    width: calc(1.5em - (var(--border-width) * 2));
    height: 100%;
    border-radius: 50%;
    background-color: var(--color);
    content: "";
    transition: margin 0.1s ease-in-out;
  }

  [type="checkbox"][role="switch"]:checked::before {
    margin-inline-start: calc(1.25em - var(--border-width));
  }
</style>
