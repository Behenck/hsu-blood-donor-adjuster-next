import styled from "styled-components"

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
`

export const FormControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const Input = styled.input`
  display: flex;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  padding: 0.875rem 1rem;
  background-color: #e2e8f0;

  transition: all 0.2s;

  &:hover {
    border: 1px solid #90a4ae;
  }
`

export const Select = styled.select`
  display: flex;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #cbd5e1;
  padding: 0.875rem 1rem;
  background-color: #e2e8f0;

  transition: all 0.2s;

  &:hover {
    border: 1px solid #90a4ae;
  }

  option {
    padding: 1rem;
  }
`

export const Button = styled.button`
  border-radius: 0.25rem;
  padding: 1rem 2rem;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: #91D2D7;
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;

  transition: all .2s;

  &:hover {
    background-color: #7ac4c9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`