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

  let filterType = $state<ListFilter>(null);

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
  <div class="todo-list-inner">
    <ul class="">
      {#each filteredTodos as todo, i}
        <li class="todo-item">
          <button
            class={[
              "button",
              "todo-check-button",
              todo.completed
                ? "todo-check-button_active"
                : "todo-check-button_unactive",
            ]}
            onclick={() => toggleTodoActive(i)}
            title="toggle todo state"
          />

          <span
            title={todo.value}
            class={["todo-value", todo.completed && "todo-value_completed"]}
          >
            {todo.value}
          </span>
          <button
            class="button todo-remove-button"
            onclick={() => removeTodo(i)}
          />
        </li>
      {/each}
    </ul>

    <div class="todo-list-footer todo-list-footer-desktop">
      <span class="todo-list-footer-count">
        {uncompletedTodosLeft} items left
      </span>

      {#if !isMobile}
        <Filters
          {filterType}
          updateFilter={(filter) => (filterType = filter)}
        />
      {/if}

      <div>
        <button onclick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  </div>

  {#if isMobile}
    <div class="todo-list-footer todo-list-footer-mobile">
      <Filters {filterType} updateFilter={(filter) => (filterType = filter)} />
    </div>
  {/if}
</div>

<style>
  .todo-list {
    margin-top: 25px;
  }

  .todo-list-inner {
    background-color: var(--bg-card);
    border-radius: var(--border-radius);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  .todo-item {
    display: flex;
    align-items: center;
    gap: 5px;

    padding: 15px 20px;
    color: var(--text-primary);
    border-bottom: 1px var(--text-primary) solid;
  }

  .todo-item:last-child {
    border-bottom: unset;
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
    height: 20px;
    width: 20px;
    position: relative;

    &:before {
      content: "";

      background-repeat: no-repeat;
      background-position: center;

      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
      width: 10px;
      height: 10px;
    }

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }

  .todo-check-button {
    border-radius: 50%;
    border: 1px var(--border-color) solid;
    margin-right: 10px;
  }

  .todo-check-button_unactive {
    background-color: var(--bg-card);
  }

  .todo-check-button_active {
    background-color: unset;
    background: var(--check-gradient);

    &:before {
      background-image: url("/icons/icon-check.svg");
    }
  }

  .todo-remove-button {
    margin-left: auto;
    background-color: transparent;
    color: var(--text-primary);
    border: unset;

    &:before {
      background-image: url("/icons/icon-cross.svg");
    }
  }

  .todo-list-footer {
    font-size: 12px;
    border-top: 2px var(--border-color) solid;
    padding: 20px;
    display: flex;

    justify-content: space-between;
    align-items: center;

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
  }

  .todo-list-footer-mobile {
    display: flex;
    justify-content: center;

    margin-top: 10px;
    background-color: var(--bg-card);
    border-radius: var(--border-radius);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
</style>
