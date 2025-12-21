<script lang="ts">
  import { getDefaultTodo } from "../todo.factory";
  import type { ITodo } from "../types";
  import { getCurrentTheme, themeState, toggleTheme } from "../utils/theme";
  import TodoList from "./TodoList.svelte";

  let todos = $state<ITodo[]>([]);

  let newTodo = $state<ITodo>({ ...getDefaultTodo() });

  const handleKeyDown = (params: KeyboardEvent) => {
    const target = params.target;

    if (target instanceof HTMLInputElement) {
      newTodo.value = target.value;
    }

    if (params.code === "Enter") {
      if (newTodo.value.trim()) {
        todos.push(newTodo);

        newTodo = { ...getDefaultTodo() };
      }
    }
  };

  const handleRemoveTodo = (idx: number) => {
    todos = todos.filter((t, index) => index !== idx);
  };

  const handleToggleTodoActive = (idx: number) => {
    const todo = todos.find((t, id) => id === idx);

    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  const clearCompleted = () => {
    todos = todos.filter((t) => !t.completed);
  };
</script>

<div class="todo">
  <div class="todo-inner">
    <div class="todo-header">
      <h1>TODO</h1>

      <a class="theme-toggle" onclick={toggleTheme}>
        {#if $themeState === "dark"}
          <img src="/icons/icon-sun.svg" />
        {:else}
          <img src="/icons/icon-moon.svg" />
        {/if}
      </a>
    </div>

    <input
      type="text"
      class="todo-input"
      bind:value={newTodo.value}
      placeholder="Create a new todo..."
      onkeydown={handleKeyDown}
    />

    {#if todos.length}
      <TodoList
        {todos}
        removeTodo={handleRemoveTodo}
        toggleTodoActive={handleToggleTodoActive}
        {clearCompleted}
      />
    {/if}
  </div>
</div>

<style>
  .todo {
    padding: 150px 10px 0px 10px;
  }

  .todo-inner {
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
  }

  .theme-toggle {
    cursor: pointer;

    &:hover {
      opacity: 0.75;
    }
  }

  .todo-header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;

    h1 {
      font-size: 28px;
      color: white;
    }
  }

  .todo-input {
    height: 50px;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--bg-card);
    color: var(--text-primary);

    padding: 5px 25px;
  }
</style>
