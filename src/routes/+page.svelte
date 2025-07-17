<script lang="ts">
  import { guiItems, selectedItemId, type GuiItem } from '$lib/stores';

  let dragId: string | null = null;
  let offsetX = 0;
  let offsetY = 0;

  function handleMouseDown(e: MouseEvent, item: GuiItem) {
      dragId = item.id;
      offsetX = e.clientX - item.x;
      offsetY = e.clientY - item.y;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
      guiItems.update(items =>
          items.map(item =>
              item.id === dragId
                  ? { ...item, x: e.clientX - offsetX, y: e.clientY - offsetY }
                  : item
          )
      );
  }

  function handleMouseUp() {
      dragId = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
  }
</script>

<div class="relative w-full h-[600px] bg-gray-100 border rounded">
    {#each $guiItems as item (item.id)}
        <div
            class="absolute cursor-move"
            style="left: {item.x}px; top: {item.y}px;"
            role="button"
            tabindex="0"
            aria-label="GUIアイテム"
            on:mousedown={(e) => handleMouseDown(e, item)}
            on:click={() => selectedItemId.set(item.id)}
            on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    selectedItemId.set(item.id);
                }
            }}
            on:contextmenu={(e) => {
                e.preventDefault();
                selectedItemId.set(item.id);
            }}
        >
            {#if item.type === 'input'}
                <input type="text" class="p-2 border rounded" placeholder="テキストを入力" />
            {:else if item.type === 'button'}
                <button class="px-4 py-2 bg-blue-500 text-white rounded">{item.label}</button>
            {:else if item.type === 'label'}
                <span class="px-2 py-1 bg-gray-200 rounded">{item.label}</span>
            {/if}
        </div>
    {/each}
</div>

<style lang="postcss">
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
