<script lang="ts">
	export let label: string = '';
	export let immunity: boolean = false;
</script>

<div class="form-control items-center">
	<span class="label-text">{label}</span>
	<input type="checkbox" class="checkbox" bind:checked={immunity} />
</div>
