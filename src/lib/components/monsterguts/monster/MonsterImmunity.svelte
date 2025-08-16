<script lang="ts">
	interface Props {
		label: string;
		immunity: boolean;
		onChange: (immunity: boolean) => void;
	}

	let { label = '', immunity = $bindable(false), onChange }: Props = $props();
</script>

<div class="form-control col-span-1 items-center">
	<span class="label-text">{label}</span>
	<input
		type="checkbox"
		class="checkbox"
		bind:checked={immunity}
		onchange={() => onChange(immunity)}
	/>
</div>
