<script lang="ts">
	interface Props {
		onReset: () => void;
		onChange: (properties: { current: number; max: number }) => void;
		label?: string;
		current?: number;
		max?: number;
	}

	let { label = '', current = 6, max = 6, onReset, onChange }: Props = $props();
</script>

<label class="form-control flex-1">
	<span class="label-text">{label}</span>
	<div class=" flex gap-2">
		<div class="join {current === max ? 'ring' : ''}">
			<input
				type="number"
				class="input join-item input-bordered max-w-16"
				bind:value={current}
				onchange={() => onChange({ current, max })}
				min={0}
			/>
			<div class="input join-item input-bordered flex items-center justify-center p-4">
				<span>/</span>
			</div>
			<input
				type="number"
				class="input join-item input-bordered max-w-16"
				bind:value={max}
				min={0}
				onchange={() => onChange({ current, max })}
			/>
			<button class="btn join-item" onclick={onReset}>Reset</button>
		</div>
	</div>
</label>
