<script>
	import { onMount } from 'svelte';

	let keyword = '';
	function scrape() {
		console.log(keyword);
	}
</script>

<div class="flex justify-center">
	<div class="mt-8">
		<h1 class="text-8xl font-semibold">Scraper</h1>
	</div>
</div>
<div class="flex items-center justify-center mt-4">
	<div class="w-96">
		<form class="flex items-center border rounded-full px-4 py-2">
			<input
				type="text"
				class="w-full px-2 py-1 focus:outline-none"
				placeholder="Enter keyword"
				bind:value={keyword}
			/>
			<button
				on:click={scrape}
				class="ml-2 px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
				>Scrape</button
			>
		</form>
		or
		<div class="flex items-center mt-4">
			<input type="file" class="mr-2" />
			<button
				type="button"
				class="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
				>Upload</button
			>
		</div>
	</div>
</div>
