<script>
  import { createEventDispatcher } from "svelte"
  import { scale } from "svelte/transition"
  import { gameRunning, userBegins, statUser } from "../stores/game.js"
  import CardStat from "./CardStat.svelte"

  export let index
  export let category
  export let item
  export let name
  export let address
  export let district
  export let info
  export let images
  export let stats

  $: src = images[0]

  const dispatch = createEventDispatcher()

  function playStat(s) {
    if ($statUser !== null) return
    if (!$gameRunning) {
      $gameRunning = true
    }

    $statUser = s
    dispatch("statPlayed")
  }
</script>

{#if $gameRunning || $userBegins}
  <div
    class="card"
    class:disabled={$statUser !== null}
    in:scale={{ delay: 350 }}
    out:scale={{ duration: 100 }}
  >
    <div class="card-title">
      <span class="title-category">{category}</span>
      <span class="title-index">{index}</span>
      <span class="title-name">{name}</span>
      <span class="address">{address}</span>
      <span class="district">{district}</span>
      <span class="info">{info}</span>
      <span class="item">{item}</span>
    </div>
    <div class="card-image">
      <img {src} alt={name} />
    </div>
    <div class="card-stats">
      {#each stats as s}
        <CardStat {...s} on:statClicked={() => playStat(s)} />
      {/each}
    </div>
  </div>
{/if}

<style>
  .card {
    display: grid;
    width: 90%;
    aspect-ratio: 0.65;
    padding: 0.5em 1em;
    margin: 0 auto;
    background-color: ghostwhite;
    border: 1px solid #666;
    border-radius: 0.5em;
    box-shadow: 0 0 0.5em rgb(0 0 0 / 0.3);
  }

  .disabled {
    opacity: 0.3;
    z-index: -1;
  }

  .card-title {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(6);
  }

  .title-category {
    grid-column: 1;
    grid-row: 1;
    font-size: 50%;
  }

  .title-index {
    grid-column: 2;
    grid-row: 1;
    font-size: 50%;
    justify-self: end;
  }

  .title-name {
    grid-column: 1 / -1;
    grid-row: 2;
    font-weight: 700;
  }

  .item {
    grid-column: 1 / -1;
    grid-row: 5;
    font-style: italic;
    font-size: 80%;
  }

  .address {
    grid-column: 1;
    grid-row: 4;
    font-size: 70%;
  }

  .district {
    grid-column: 2;
    grid-row: 4;
    font-size: 70%;
    justify-self: end;
  }

  .info {
    grid-column: span 2;
    grid-row: 6;
    font-size: 50%;
  }

  .card-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  .card-image img {
    object-fit: contain;
  }
</style>
