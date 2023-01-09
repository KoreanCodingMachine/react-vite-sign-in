import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 360px;
`

export const FormField = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  input[type="email"], input[type="password"] {
    flex: 1;
    padding: 8px 12px;
    font-size: 1rem;
  }
`
