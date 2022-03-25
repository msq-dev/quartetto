import { writable } from "svelte/store"

export const userBegins = writable(null)
export const gameRunning = writable(false)
export const statUser = writable(null)
export const statNpc = writable(null)

export const runAnimation = writable(false)
