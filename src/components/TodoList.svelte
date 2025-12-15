<script lang="ts">
  import type { ITodo } from "../types";

  const {
    todos,
    removeTodo,
    toggleTodoActive,
  }: {
    todos: ITodo[];
    removeTodo: (idx: number) => void;
    toggleTodoActive: (idx: number) => void;
  } = $props();
</script>

<div class="todo-list">
  <ul class="todo-inner">
    {#each todos as todo, i}
      <li class="todo-item">
        <button
          class={[
            "todo-check-button",
            todo.completed
              ? "todo-check-button_active"
              : "todo-check-button_unactive",
          ]}
          onclick={() => toggleTodoActive(i)}
          title="toggle todo state"
        />

        {todo.value}
        <button class="todo-remove" onclick={() => removeTodo(i)}>X</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .todo-list {
    margin-top: 25px;
  }

  .todo-inner {
    background-color: var(--bg-card);
    border-radius: var(--border-radius);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  .todo-item {
    display: flex;
    align-items: center;

    padding: 15px 20px;
    color: var(--text-primary);
    border-bottom: 1px black solid;
  }

  .todo-item:last-child {
    border-bottom: unset;
  }

  .todo-remove {
    margin-left: auto;
  }

  .todo-check-button {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px var(--border-color) solid;
    margin-right: 10px;

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }

  .todo-check-button_unactive {
    background-color: var(--bg-card);
  }

  .todo-check-button_active {
    background-color: unset;
    background: var(--check-gradient);
    position: relative;

    &:before {
      content: "";

      background-image: url("/icons/icon-check.svg");
      background-repeat: no-repeat;
      background-position: center;

      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
      width: 10px;
      height: 10px;
    }
  }
</style>
