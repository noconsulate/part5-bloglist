import {useState} from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const setField = (value) => {
    setValue(value)
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    setField,
    reset
  }
}