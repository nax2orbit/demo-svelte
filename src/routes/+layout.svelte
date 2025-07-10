<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { selectedItemId, guiItems } from '$lib/stores';
	$: selectedItem = $guiItems.find(item => item.id === $selectedItemId);

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	function addInput() {
		guiItems.update(items => [
			...items,
			{ id: crypto.randomUUID(), type: 'input', x: 50, y: 50 }
		]);
	}
	function addButton() {
		guiItems.update(items => [
			...items,
			{ id: crypto.randomUUID(), type: 'button', label: '追加ボタン', x: 100, y: 100 }
		]);
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- サイドバー -->
	<div class="flex min-h-screen">
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
		<!-- メインコンテンツ -->
		<main class="flex-1 p-4">
			<!-- Page Route Content -->
			<slot />
		</main>

		<!-- プロパティパネル -->
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
				<!-- input用のプロパティも同様に追加可能 -->
			{:else}
				<div class="text-gray-400">パーツを選択してください</div>
			{/if}
		</div>
	</div>
</AppShell>
