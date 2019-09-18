import {useState} from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (event) {
     setValue(event.target.value)
    } else {
      setValue('')
    }
  }

  return {
    type,
    value,
    name,
    onChange,
  }
}