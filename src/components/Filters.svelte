<script lang="ts">
  import type { ListFilter } from "../types";

  const {
    filterType,
    updateFilter,
  }: { filterType: ListFilter; updateFilter: (filter: ListFilter) => void } =
    $props();

  const handleFilterUpdate = (filter: typeof filterType) => {
    if (filter === filterType) {
      updateFilter(null);
    } else {
      updateFilter(filter);
    }
  };
</script>

<div class="filters">
  <button
    class={[filterType === null ? "filter-active" : ""]}
    onclick={() => handleFilterUpdate(null)}
  >
    All
  </button>
  <button
    class={[filterType === "active" ? "filter-active" : ""]}
    onclick={() => handleFilterUpdate("active")}
  >
    Active
  </button>
  <button
    class={[filterType === "completed" ? "filter-active" : ""]}
    onclick={() => handleFilterUpdate("completed")}
  >
    Completed
  </button>
</div>

<style>
  .filters {
    button {
      font-size: 12px;
      background-color: transparent;
      border: unset;
      color: var(--text-primary);

      &:hover {
        color: var(--text-secondary);
        cursor: pointer;
      }
    }

    .filter-active {
      color: var(--blue-500);
    }
  }
</style>
