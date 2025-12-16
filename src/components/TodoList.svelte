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
</style>
