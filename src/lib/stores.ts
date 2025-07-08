import { writable } from 'svelte/store';

export const showInput = writable(false);

export const buttons = writable<string[]>([]);