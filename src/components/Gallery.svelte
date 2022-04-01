<script>
  import GallerySlider from "./GallerySlider.svelte"
  export let images = []
  export let item = ""

  let slider
  let currentIndex = 0

  const delayedExec = (after, fn) => {
    let timer
    return () => {
      timer && clearTimeout(timer)
      timer = setTimeout(fn, after)
    }
  }

  const scrollStopper = delayedExec(100, () => {
    currentIndex = Math.round(slider.scrollLeft / 275)
  })
</script>

<div class="slider-container">
  <div class="slider" on:scroll={() => scrollStopper()} bind:this={slider}>
    {#each images as src}
      <GallerySlider {src} {item} />
    {/each}
  </div>
  <div class="indicator-container">
    {#each images as _, i}
      {#if i === currentIndex}
        <span>&middot;</span>
      {:else}
        <span style="color: magenta;">&middot;</span>
      {/if}
    {/each}
  </div>
</div>

<style>
  .slider-container {
    position: relative;
  }

  .slider {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
    scroll-behavior: smooth;
    overflow-x: scroll;
  }

  .indicator-container {
    position: absolute;
    left: 50%;
    bottom: 5%;
    z-index: 10;
    transform: translateX(-50%);
    color: greenyellow;
    font-size: 300%;
  }
</style>
