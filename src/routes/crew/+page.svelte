<script lang="ts">
  
	import { resolve } from '$app/paths';

	import { attributes } from '$lib/stores/attributes';

	function handleRole(role: 'foreman' | 'worker') {
		attributes.update((current) => ({
			...current,
			role
		}));

		console.log('attributes set:', role);
	}
</script>

<svelte:head>
	<title>What is your role?</title>
	<meta name="description" content="Define your role" />
</svelte:head>

<div class="text-column">
	<h1>Define your role</h1>

	<p>Define your role by clicking a button</p>

	<div class="role-buttons">
		<button class="btn foreman" type="button" on:click={() => handleRole('foreman')}>
			Foreman
		</button>

		<button class="btn worker" type="button" on:click={() => handleRole('worker')}>
			Worker
		</button>
	</div>
</div>

<style>
	.role-buttons {
		display: flex;
		gap: 12px;
		align-items: center;
		margin-top: 16px;
	}

	.btn {
		padding: 10px 16px;
		border-radius: 10px;
		border: 1px solid #ccc;
		background: white;
		font-size: 16px;
		cursor: pointer;
	}

	.btn:hover {
		filter: brightness(0.97);
	}

	.foreman {
		font-weight: 700;
	}

	.worker {
		font-weight: 500;
	}
</style>
