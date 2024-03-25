<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { results, user } from '../../stores';
	import type { Result } from './result.dto';

	let keyword = '';
	let username: string;
	let res: Result[];
	user.subscribe((value: string) => {
		username = value;
	});
	results.subscribe((value: Result[]) => {
		res = value;
	});

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/user', {
				method: 'GET',
				credentials: 'include',
				redirect: 'follow'
			});

			if (response.ok) {
				const data = await response.json();
				user.set(data.data.sub);

				const resultsResponse = await fetch(`http://localhost:3000/results/${data.data.sub}`, {
					method: 'GET',
					credentials: 'include',
					redirect: 'follow'
				});

				const resultData = await resultsResponse.json();
				const newResults: Result[] = resultData.data.map((ele: any) => ({
					id: ele.id,
					keyword: ele.keyword
				}));
				results.set(newResults);
			} else {
				redirect(308, '/');
			}
		} catch (err) {
			redirect(308, '/');
		}
	});
	function scrape() {
		console.log(username);
		// const result = await fetch("http://localhost:3000/result")
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
				>Upload csv</button
			>
		</div>
	</div>
</div>

<div class="flex justify-center">
	<div>
		<p class=" text-4xl font-bold">History</p>
		{#each $results as res}
			<div>
				<a class="underline text-blue-600" href="http://localhost:3000/result/{res.id}"
					>{res.keyword}</a
				>
			</div>
		{/each}
	</div>
</div>
