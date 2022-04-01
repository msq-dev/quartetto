<script>
  import { onMount } from "svelte"
  import SparkInstance from "./SparkInstance.svelte"

  export let winner = false

  $: sparksArray = new Array(3)

  onMount(() => {
    setInterval(() => {
      sparksArray = [...sparksArray, 1]
    }, 300)
  })
</script>

<div class="sparkling">
  {#if winner}
    {#each sparksArray as _}
      <SparkInstance />
    {/each}
  {/if}
  <slot />
</div>

<style>
  .sparkling {
    position: relative;
  }
</style>
