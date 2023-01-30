import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import { ITodo } from '../types'

interface ITodoContext {
  todos: ITodo[]
  remove(id: number): void
  toggle(id: number): void
  add(todo: Omit<ITodo, 'id' | 'checked'>): void
}

const useDefaultTodoContext = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    {
      id: 0,
      text: '1번 할 일',
      checked: true,
    },
    {
      id: 1,
      text: '2번 할 일',
      checked: true,
    },
    {
      id: 2,
      text: '3번 할 일',
      checked: false,
    },
  ])

  const remove = useCallback(
    (id: number) => {
      setTodos(todos.filter(todo => todo.id !== id))
    },
    [todos]
  )

  const toggle = useCallback(
    (id: number) => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      )
    },
    [todos]
  )

  const add = useCallback(
    (todo: Omit<ITodo, 'id' | 'checked'>) => {
      setTodos(todos => {
        return todos.concat({
          id: todos.length,
          checked: false,
          ...todo,
        })
      })
    },
    [todos]
  )

  return { todos, add, remove, toggle }
}

// contextapi 생성 (초기값)
const TodoContext = createContext<ITodoContext>({
  todos: [],
  remove: () => null,
  toggle: () => null,
  add: () => null,
})

// useContext hook을 사용하여 하위 컴포넌트에서 사용
export const useTodoContext = () => {
  const { todos, add, remove, toggle } = useContext(TodoContext)

  return { todos, add, remove, toggle }
}

// Provider로 감싸서 하위 컴포넌트에게 데이터 전달
export const TodoContextProvider = ({ children }: PropsWithChildren<any>) => {
  const { todos, add, remove, toggle } = useDefaultTodoContext()

  return (
    <TodoContext.Provider
      value={{
        todos,
        add,
        remove,
        toggle,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
