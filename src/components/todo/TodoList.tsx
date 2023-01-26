import styled from 'styled-components'
import TodoListItem from './TodoListItem'
import { useTodoContext } from '../../contexts/TodoContext'

const TodoListWrapper = styled.div`
  min-height:320px;
  max-height:513px;
  overflow-y:auto;
`

const TodoList = () => {
  const { todos } = useTodoContext()

  return (
    <TodoListWrapper>
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </TodoListWrapper>
  )
}

export default TodoList
