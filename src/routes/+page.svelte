<script lang="ts">
  import { guiItems, selectedItemId } from '$lib/stores';

  let dragId = null;
  let offsetX = 0;
  let offsetY = 0;

  function handleMouseDown(e, item) {
      dragId = item.id;
      offsetX = e.clientX - item.x;
      offsetY = e.clientY - item.y;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(e) {
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
            on:mousedown={(e) => handleMouseDown(e, item)}
            on:click={() => selectedItemId.set(item.id)}
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
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
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
