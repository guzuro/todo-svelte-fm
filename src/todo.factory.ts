import { type ITodo } from './types';

export const getDefaultTodo = () => {
    return {
        value: '',
        completed: false
    } satisfies ITodo
} 