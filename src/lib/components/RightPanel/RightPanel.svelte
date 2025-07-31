<script lang="ts">
  import { guiItems } from '$lib/stores';
  export let selectedItem: any;
</script>

<div class="w-80 bg-white border-l p-4">
  {#if selectedItem}
    <h2 class="font-bold mb-2">プロパティ</h2>
    {#if selectedItem.type === 'button'}
      <div class="mb-2">
        <label class="block text-sm mb-1">ラベル</label>
        <input
          type="text"
          class="border rounded p-1 w-full"
          value={selectedItem.label}
          on:input={(e) => {
            guiItems.update(items =>
              items.map(item =>
                item.id === selectedItem.id
                  ? { ...item, label: e.target.value }
                  : item
              )
            );
          }}
        />
      </div>
      <div class="mb-2">
        <label class="block text-sm mb-1">色</label>
        <input
          type="color"
          class="w-10 h-10 p-0 border-none"
          value={selectedItem.color || '#3b82f6'}
          on:input={(e) => {
            guiItems.update(items =>
              items.map(item =>
                item.id === selectedItem.id
                  ? { ...item, color: e.target.value }
                  : item
              )
            );
          }}
        />
      </div>
    {/if}
    <!-- inputやlabel用のプロパティもここに追加可能 -->
  {:else}
    <div class="text-gray-400">パーツを選択してください</div>
  {/if}
</div>