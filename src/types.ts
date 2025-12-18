export interface ITodo {
    value: string
    completed: boolean
}

export type ListFilter = null | "active" | "completed"