import { createGlobalStyle } from 'styled-components'
import TodoTemplate from '../components/todo/TodoTemplate'
import TodoInsert from '../components/todo/TodoInsert'
import TodoList from '../components/todo/TodoList'
import { TodoContextProvider } from '../contexts/TodoContext'

const GlobalStyle = createGlobalStyle`
    body{
        background:#e9ecef;
        box-sizing:border-box;
    }
`

const Todo = () => {
  return (
    <TodoContextProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoInsert />
        <TodoList />
      </TodoTemplate>
    </TodoContextProvider>
  )
}

export default Todo
