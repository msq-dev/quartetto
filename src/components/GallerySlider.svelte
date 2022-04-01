<script>
  export let src
  export let item
</script>

<div class="img-slider">
  <img {src} alt={item} />
</div>

<style>
  .img-slider {
    scroll-snap-align: start;
  }

  .img-slider img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
</style>
