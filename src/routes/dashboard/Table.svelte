<script lang="ts">
	import { baseUrl, results } from '../../stores';
	let base: string;
	baseUrl.subscribe((value: string) => {
		base = value;
	});
</script>

<table class="min-w-full divide-y divide-gray-200">
	<thead class="bg-gray-100">
		<tr>
			<th class="py-2 px-4">Keyword</th>
			<th class="py-2 px-4">Link amount</th>
			<th class="py-2 px-4">Adword amount</th>
			<th class="py-2 px-4">Total search result</th>
		</tr>
	</thead>
	<tbody class="bg-white divide-y divide-gray-200">
		{#each $results as res}
			<tr>
				<td class="py-2 px-4 text-center"
					><a class="underline text-blue-600" href="{base}/result/{res.id}" target="_blank"
						>{res.keyword}</a
					></td
				>
				<td class="py-2 px-4 text-center"><p>{res.linkAmount}</p></td>
				<td class="py-2 px-4 text-center"><p>{res.adwordAmount}</p></td>
				<td class="py-2 px-4 text-center"><p>{res.totalSearchResult}</p></td>
			</tr>
		{/each}
	</tbody>
</table>
