<script>
  import { scale, fade } from "svelte/transition"
  import { quintIn, quintOut } from "svelte/easing"
  import { runAnimation } from "../stores/game.js"
</script>

{#if $runAnimation}
  <div
    class="animated-text"
    in:scale={{ duration: 500, easing: quintIn }}
    out:fade={{ duration: 3000, easing: quintOut }}
    on:introend={() => ($runAnimation = false)}
  >
    Stich!
  </div>
{/if}

<style>
  .animated-text {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-10deg);
    font-weight: 700;
    color: var(--user-dark);
    font-size: 1000%;
  }
</style>
