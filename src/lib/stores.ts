import { writable } from 'svelte/store';

// showInput を配列で管理
export const inputFields = writable<number[]>([]);

export const buttons = writable<string[]>([]);