<script>
  import { createEventDispatcher } from "svelte"
  import { statNpc } from "../stores/game.js"

  export let name
  export let value
  export let unit
  export let highestWins

  const showWinDirection = false

  $: disabled = $statNpc !== null && $statNpc.name !== name

  const dispatch = createEventDispatcher()

  function statClicked() {
    if (disabled) return

    dispatch("statClicked")
  }
</script>

<div class="stat" class:disabled on:click={() => statClicked()}>
  <div class="stat-name">{name}</div>
  <div class="stat-data">
    <span class="stat-value">{value.toString().replace(".", ",")}</span>
    <span class="stat-unit">{unit}</span>
    {#if showWinDirection}
      <span class="stat-win-hint"
        >{@html highestWins ? "&uarr;" : "&darr;"}</span
      >
    {/if}
  </div>
</div>

<style>
  .stat {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 75%;
    margin-top: 0.2em;
  }

  .stat-win-hint {
    float: right;
  }

  .disabled {
    opacity: 0.2;
  }
</style>
