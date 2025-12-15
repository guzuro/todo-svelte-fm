<script lang="ts">
  import { getDefaultTodo } from "../todo.factory";
  import type { ITodo } from "../types";
  import TodoList from "./TodoList.svelte";

  let todos = $state<ITodo[]>([]);

  let newTodo = $state<ITodo>({ ...getDefaultTodo() });

  const handleKeyDown = (params: KeyboardEvent) => {
    const target = params.target;

    if (target instanceof HTMLInputElement) {
      newTodo.value = target.value;
    }

    if (params.code === "Enter") {
      todos.push(newTodo);

      newTodo = { ...getDefaultTodo() };
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
</script>

<div class="todo">
  <div class="todo-inner">
    <div class="todo-header">
      <h1>TODO</h1>
    </div>

    <input
      type="text"
      class="todo-input"
      bind:value={newTodo.value}
      onkeydown={handleKeyDown}
    />

    {#if todos.length}
      <TodoList
        {todos}
        removeTodo={handleRemoveTodo}
        toggleTodoActive={handleToggleTodoActive}
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

  .todo-header {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    h1 {
      font-size: 28px;
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
