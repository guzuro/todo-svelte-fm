<script lang="ts">
  import type { ITodo, ListFilter } from "../types";
  import Filters from "./Filters.svelte";

  const {
    todos,
    removeTodo,
    toggleTodoActive,
    clearCompleted,
  }: {
    todos: ITodo[];
    removeTodo: (idx: number) => void;
    toggleTodoActive: (idx: number) => void;
    clearCompleted: () => void;
  } = $props();

  let innerWidth = $state(0);

  const uncompletedTodosLeft = $derived.by(
    () => todos.filter((t) => !t.completed).length
  );

  let filterType = $state<ListFilter>("all");

  const filteredTodos = $derived.by(() => {
    if (filterType === "active") {
      return todos.filter((t) => !t.completed);
    } else if (filterType === "completed") {
      return todos.filter((t) => t.completed);
    } else {
      return todos;
    }
  });

  const isMobile = $derived(innerWidth <= 375);
</script>

<svelte:window bind:innerWidth />

<div class="todo-list">
  <div class="card">
    <ul class="">
      {#each filteredTodos as todo, i}
        <li class="todo-item">
          <button
            class={[
              "button",
              "button-icon",
              "button-check",
              todo.completed && "button-check_active",
            ]}
            onclick={() => toggleTodoActive(i)}
            title="toggle todo state"
          >
            {#if todo.completed}
              <span class="icon icon-check" />
            {/if}
          </button>

          <span
            title={todo.value}
            class={["todo-value", todo.completed && "todo-value_completed"]}
          >
            {todo.value}
          </span>
          <button
            class="button button-icon button-remove"
            onclick={() => removeTodo(i)}
          >
            <span class="icon icon-remove" />
          </button>
        </li>
      {/each}
    </ul>

    <div class="footer">
      <span class="todo-list-footer-count">
        {uncompletedTodosLeft} items left
      </span>

      {#if !isMobile}
        <Filters
          {filterType}
          updateFilter={(filter) => (filterType = filter)}
        />
      {/if}

      <button class="button-clear-completed" onclick={clearCompleted}
        >Clear completed</button
      >
    </div>
  </div>

  {#if isMobile}
    <div class="card footer footer-mobile">
      <Filters {filterType} updateFilter={(filter) => (filterType = filter)} />
    </div>
  {/if}
</div>

<style>
  .todo-list {
    margin-top: 25px;
  }

  .card {
    padding: 15px;
    background-color: var(--bg-card);
    border-radius: var(--border-radius);
    box-shadow: 6px 10px 30px -3px rgba(34, 60, 80, 0.2);
  }

  .todo-item {
    display: flex;
    align-items: center;
    gap: 5px;

    padding: 15px 0;
    color: var(--text-primary);
    border-bottom: 1px var(--text-primary) solid;
  }

  .todo-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .todo-value_completed {
    text-decoration: line-through;
    opacity: 0.4;
  }

  .button {
    position: relative;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  .button-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .button-check {
    border-radius: 50%;
    border: 1px var(--border-color) solid;
    margin-right: 10px;
    background-color: var(--bg-card);
  }

  .button-check_active {
    background: var(--check-gradient);
  }

  .button-remove {
    margin-left: auto;
    color: var(--text-primary);
  }

  .icon {
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .icon-check {
    background-image: url("../assets/icons/icon-check.svg");
  }

  .icon-remove {
    background-image: url("../assets/icons/icon-cross.svg");
  }

  .button-clear-completed {
    background: unset;
    border: unset;
    font-size: 12px;
    color: var(--text-primary);

    &:hover {
      color: var(--text-secondary);
      cursor: pointer;
    }
  }

  .footer {
    font-size: 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 15px 0;
  }

  .footer-mobile {
    display: flex;
    justify-content: center;

    margin-top: 10px;
  }
</style>
