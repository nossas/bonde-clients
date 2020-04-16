import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Input, Icon } from 'bonde-components'

const InputAddon = styled.div`
  position: relative;

  button {
    position: absolute;
    right: 0;
    border: none;
    top: 10px;
    padding: 0;
  }

  input {
    padding-right: 20px;
  }
`

const SearchInput = ({ data, field, placeholder, onChange }) => {
  const inputRef = useRef(null)

  const normalize = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()

  const searching = (c) => {
    const search = inputRef.current.value
    if (search) {
      return normalize(c[field]).indexOf(normalize(search)) !== -1
    }
    return true
  }

  return (
    <form
      className='hide-xs'
      onSubmit={e => {
        e.preventDefault()
        onChange(data.filter(searching))
      }}
    >
      <InputAddon>
        <Input
          ref={inputRef}
          placeholder={placeholder}
        />
        <Button dark type='submit'><Icon name='Search' size='small' /></Button>
      </InputAddon>
    </form>
  )
}

SearchInput.propTypes = {
  field: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default SearchInput
