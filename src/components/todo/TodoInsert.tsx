import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { MdAdd } from 'react-icons/md'
import { useTodoContext } from '../../contexts/TodoContext'

const Form = styled.form`
  display: flex;
  background:#495057;
  input {
    background:none;
    outline:none;
    border:none;
    padding: 0.5rem;
    font-size: 1rem;
    line-height:1.5;
    color:white;
    &::placeholder {
      color:#dee2e6;
    }
    flex:1; // 버튼을 제외한 모든 영역 차지 
  }

  button {
    background:none;
    outline:none;
    border:none;
    background:#868e96;
    color:white;
    padding-left:1rem;
    padding-right:1rem;
    font-size:1.5rem;
    display: flex;
    align-items:center;
    cursor:pointer;
    transition: 0.1s background ease-in;
    &:hover {
      background:#adb5bd;
    }
  }

`

const TodoInsert = () => {
  const [value, setValue] = useState('')
  const { add } = useTodoContext()

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      add({ text: value })
      setValue('')
      e.preventDefault()
    },
    [value]
  )

  return (
    <Form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </Form>
  )
}

export default TodoInsert
