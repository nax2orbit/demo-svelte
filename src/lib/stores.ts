import { writable } from 'svelte/store';

export type GuiItem = {
    id: string;
    type: 'input' | 'button';
    label?: string;
    x: number;
    y: number;
};

export const guiItems = writable<GuiItem[]>([]);