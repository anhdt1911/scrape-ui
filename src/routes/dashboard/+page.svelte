<script lang="ts">
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { baseUrl, results, user } from '../../stores';
	import type { Result } from './result.dto';
	import Table from './Table.svelte';

	let keyword = '';
	let username: string;
	let files: any;
	let res: Result[];
	let base: string;
	user.subscribe((value: string) => {
		username = value;
	});
	results.subscribe((value: Result[]) => {
		res = value;
	});
	baseUrl.subscribe((value: string) => {
		base = value;
	});

	async function logout() {
		Cookies.remove('auth-session');
	}

	async function fetchResult() {
		const resultsResponse = await fetch(`${base}/results/${username}`, {
			method: 'GET',
			credentials: 'include',
			redirect: 'follow'
		});

		const resultData = await resultsResponse.json();
		const newResults: Result[] = resultData.data.map((ele: any) => ({
			id: ele.id,
			keyword: ele.keyword,
			linkAmount: ele.linkAmount,
			adwordAmount: ele.adwordAmount,
			totalSearchResult: ele.totalSearchResult
		}));
		results.set(newResults);
	}

	onMount(async () => {
		try {
			const response = await fetch(`${base}/user`, {
				method: 'GET',
				credentials: 'include'
			});

			if (response.ok) {
				const data = await response.json();
				user.set(data.data.sub);
				await fetchResult();
			}
		} catch (err) {
			console.log(err);
		}
	});

	async function scrape() {
		const formData = new FormData();
		formData.append('keyword', keyword);
		formData.append('userID', username);

		const response = await fetch(`${base}/scrape`, {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			await fetchResult();
		}
		keyword = '';
	}

	async function batchScrape() {
		if (files && files[0]) {
			const formData = new FormData();
			formData.append('file', files[0]);
			formData.append('userID', username);
			const response = await fetch(`${base}/batch-scrape`, {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				alert('Data being scrape in the background. Sit tight and refresh after a few secs!');
				await fetchResult();
			}
		}
	}
</script>

<button class="logout-button bg-blue-500 text-white px-4 py-2 rounded" on:click={logout}>
	<a href="{base}/logout">Sign Out</a>
</button>
<div class="flex justify-center">
	<div class="mt-8">
		<h1 class="text-8xl font-semibold">Scraper</h1>
	</div>
</div>
<div class="flex items-center justify-center mt-4">
	<div class="w-96">
		<form class="flex items-center border rounded-full px-4 py-2 mb-5">
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
		<div class="py-2">
			<p>or upload csv to batch upload in the background</p>
		</div>
		<div class="flex items-center mt-4">
			<input type="file" accept=".csv" bind:files multiple={false} class="mr-2" />
			<button
				on:click={batchScrape}
				type="button"
				class="px-4 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
				>Batch scrape</button
			>
		</div>
	</div>
</div>

<div class="flex justify-center mt-9">
	<div>
		<p class=" text-4xl font-bold">History</p>
	</div>
</div>

<Table />

<style>
	.logout-button {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
</style>
