<script lang="ts">
  import type { ITodo } from "../types";

  const {
    todos,
    removeTodo,
  }: { todos: ITodo[]; removeTodo: (idx: number) => void } = $props();
</script>

<div class="todo-list">
  <ul class="todo-inner">
    {#each todos as todo, i}
      <li class="todo-item" onclick={() => removeTodo(i)}>
        {todo.value} <button class="todo-remove">X</button>
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
</style>
