<script>
  import { onMount } from "svelte"
  import Card from "./components/Card.svelte"
  import BoxInfo from "./components/BoxInfo.svelte"
  import TextAnimation from "./components/TextAnimation.svelte"
  import {
    gameRunning,
    userBegins,
    statUser,
    statNpc,
    runAnimation,
  } from "./stores/game.js"
  import deck from "./data/soul_food_deck.js"

  // courtesy of StackOverflow
  // https://stackoverflow.com/a/12646864
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const DECK = shuffle(deck)

  let userDeck = []
  for (let i = 0; i < 16; i++) {
    userDeck.push(DECK.pop())
  }
  let npcDeck = DECK

  $: statsPlayed = [$statUser, $statNpc]
  let userWins = null

  onMount(() => {
    $userBegins = true
    // $userBegins = Math.round(Math.random()) ? true : false
  })

  function moveUser() {
    if ($statNpc === null) {
      $statNpc = npcDeck[0].stats.find((s) => {
        return s.name === $statUser.name
      })
      evaluateTurn()
      return
    }
    evaluateTurn()
  }

  function moveNpc() {
    if (!$gameRunning) {
      $gameRunning = true
    }
    userWins = null
    const statIdx = Math.floor(Math.random() * npcDeck[0].stats.length)
    $statNpc = npcDeck[0].stats[statIdx]
  }

  function evaluateTurn() {
    if ($statUser.value === $statNpc.value) {
      $runAnimation = true
      setTimeout(() => {
        handleDraw()
        return
      }, 500)
    }

    if (
      $statUser.highestWins
        ? $statUser.value > $statNpc.value
        : $statUser.value < $statNpc.value
    ) {
      userWins = true
    } else {
      userWins = false
    }
  }

  /*****************/
  /***** TODO *****/
  /*****************/
  function handleDraw() {
    userDeck.push(userDeck.shift())
    npcDeck.push(npcDeck.shift())

    userDeck = userDeck
    npcDeck = npcDeck

    $statUser = null
    $statNpc = null

    userWins = true
  }
  /*****************/
  /***** TODO *****/
  /*****************/

  function endTurn() {
    if (userWins) {
      userDeck.push(userDeck.shift())
      userDeck.push(npcDeck.shift())
    } else {
      npcDeck.push(npcDeck.shift())
      npcDeck.push(userDeck.shift())
    }

    userDeck = userDeck
    npcDeck = npcDeck

    $statUser = null
    $statNpc = null

    if (!userWins) {
      setTimeout(() => {
        moveNpc()
      }, 500)
    }
  }
</script>

<main>
  <TextAnimation />
  {#if $statUser !== null && $statNpc !== null}
    <div class="overlay" on:click={endTurn} />
  {/if}

  {#if $gameRunning}
    <BoxInfo gameInfo npc>
      Computer hat {npcDeck.length} Karten
    </BoxInfo>
  {:else if !$gameRunning && !$userBegins}
    <BoxInfo gameInfo npc inverted>
      Computer fängt an <button class="btn-start" on:click={() => moveNpc()}
        >Start</button
      >
    </BoxInfo>
  {/if}

  <div class="stats-played">
    {#each statsPlayed as s}
      {#if s !== null}
        <BoxInfo
          statPlayedInfo
          inverted
          user={s === $statUser}
          npc={s === $statNpc}
          winner={(s === $statUser && userWins) ||
            (s === $statNpc && userWins === false)}
        >
          <div class="card-name">
            {s === $statUser ? userDeck[0].name : npcDeck[0].name}
          </div>
          <div>
            {#if s === $statUser}
              {$statUser.name} {$statUser.value} {$statUser.unit}
            {:else}
              {$statNpc.name} {$statNpc.value} {$statNpc.unit}
            {/if}
          </div>
        </BoxInfo>
      {/if}
    {/each}
  </div>

  {#key userDeck}
    <Card {...userDeck[0]} on:statPlayed={moveUser} />
  {/key}

  {#if $gameRunning}
    <BoxInfo gameInfo user>
      Du hast {userDeck.length} Karten
    </BoxInfo>
  {:else if !$gameRunning && $userBegins}
    <BoxInfo gameInfo user inverted>
      Du fängst an. Wähle eine Kategorie.
    </BoxInfo>
  {/if}
</main>

<style>
  main {
    width: min(100% - 2rem, 65ch);
    margin: 1em auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .stats-played {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 3rem;
    gap: 1em;
  }

  .card-name {
    font-weight: 700;
  }

  .btn-start {
    float: right;
    font-size: 80%;
    line-height: 1.7;
    border-radius: 100vw;
    padding: 0 0.7em;
    color: var(--npc-dark);
    background-color: var(--npc-light);
  }

  .overlay {
    position: absolute;
    z-index: 10;
    inset: 0;
    height: 100vh;
  }
</style>
