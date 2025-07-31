<script lang="ts">
  export let addInput: () => void;
  export let addButton: () => void;
  import { guiItems } from '$lib/stores';
</script>

<nav class="w-64 p-4 bg-surface-100">
  <ul class="space-y-2">
    <li>
      <button
        class="w-full px-2 py-1 rounded bg-surface-200 text-center hover:bg-surface-300 transition"
        on:click={addInput}
      >
        TextField
      </button>
    </li>
    <li>
      <button
        class="w-full px-2 py-1 rounded bg-surface-200 text-center hover:bg-surface-300 transition"
        on:click={addButton}
      >
        Button
      </button>
    </li>
    <li>
      <button
        class="w-full px-2 py-1 rounded bg-surface-200 text-center hover:bg-surface-300 transition"
        on:click={() => {
          guiItems.update(items => [
            ...items,
            { id: crypto.randomUUID(), type: 'label', label: 'ラベル', x: 120, y: 120 }
          ]);
        }}
      >
        Label
      </button>
    </li>
  </ul>
</nav>