<script>
  import { scale } from "svelte/transition"

  export let user = false
  export let npc = false
  export let inverted = false
  export let gameInfo = false
  export let statPlayedInfo = false
  export let winner = false
</script>

<div
  class="info-box"
  class:user
  class:npc
  class:inverted
  class:winner
  class:game-info={gameInfo}
  class:stat-played-info={statPlayedInfo}
  in:scale={statPlayedInfo && npc
    ? { delay: 350 }
    : { duration: !gameInfo ? 300 : 0, delay: 0 }}
  out:scale={{ duration: !gameInfo ? 100 : 0 }}
>
  <slot />
</div>

<style>
  .info-box {
    padding: 0.25em 0.5em;
    background-color: ghostwhite;
    border-radius: 0.3em;
    font-size: 60%;
  }

  .game-info {
    display: flex;
    justify-content: space-between;
  }

  .stat-played-info {
    font-size: 90%;
  }

  .user {
    color: var(--user-dark);
  }

  .npc {
    color: var(--npc-dark);
  }

  .user.inverted {
    color: var(--user-light);
    background-color: var(--user-dark);
  }

  .npc.inverted {
    color: var(--npc-light);
    background-color: var(--npc-dark);
  }

  .winner {
    outline: 4px solid gold;
  }
</style>
