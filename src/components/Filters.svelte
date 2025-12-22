<script lang="ts">
  import type { ListFilter } from "../types";
  import Segmented from "../ui/Segmented/Segmented.svelte";

  const {
    filterType,
    updateFilter,
  }: { filterType: ListFilter; updateFilter: (filter: ListFilter) => void } =
    $props();

  const handleFilterUpdate = (filter: typeof filterType) => {
    if (filter === filterType) {
      updateFilter("all");
    } else {
      updateFilter(filter);
    }
  };
</script>

<div class="filters">
  <Segmented
    options={[
      { label: "All", value: "all" },
      { label: "Active", value: "active" },
      { label: "Completed", value: "completed" },
    ] satisfies { label: string; value: ListFilter }[]}
    onchange={(item) => handleFilterUpdate(item.value)}
  />
</div>

<style>
</style>
