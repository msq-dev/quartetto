<script>
  import { onMount } from "svelte"
  import { scale } from "svelte/transition"

  let sparkle
  let posX
  let posY
  let delay

  function spin(node, { duration }) {
    return {
      duration,
      css: (t) => {
        return `
          transform: scale(${t}) rotate(${t * 180}deg)
        `
      },
    }
  }

  onMount(() => {
    sparkle = true
    posX = Math.random() * 100
    posY = Math.random() * 100
    delay = Math.floor(Math.random() * 100)
  })
</script>

{#if sparkle}
  <div
    class="spark"
    style:left={posX + "%"}
    style:top={posY + "%"}
    in:spin={{ duration: 800, delay }}
    out:scale={{ duration: 550 }}
    on:introend={() => (sparkle = false)}
  >
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
      />
    </svg>
  </div>
{/if}

<style>
  .spark {
    position: absolute;
    z-index: 10;
    width: 1.5rem;
    height: 1.5rem;
  }

  .spark > svg > path {
    fill: #ffc700;
  }
</style>
