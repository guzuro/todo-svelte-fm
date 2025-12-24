<script lang="ts" generics="V">
  interface SegmentedOption {
    label: string;
    value: V;
  }

  const {
    options,
    onchange,
  }: { options: SegmentedOption[]; onchange: (opt: SegmentedOption) => void } =
    $props();

  let activeOpt = $state<null | SegmentedOption>(null);

  const updateValue = (opt: SegmentedOption) => {
    activeOpt = opt;
    onchange(opt);
  };
</script>

<div class="segmented">
  {#each options as option}
    <button
      class={[
        "segmented-button",
        option.value === activeOpt?.value && "segmented-button-active",
      ]}
      onclick={() => updateValue(option)}
    >
      {option.label}
    </button>
  {/each}
</div>

<style>
  .segmented {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .segmented-button {
    font-size: 12px;
    flex: 1;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-primary);
    
    &:hover {
      color: var(--text-secondary);
    }
  }

  .segmented-button-active {
    color: var(--blue-500);
  }
</style>
