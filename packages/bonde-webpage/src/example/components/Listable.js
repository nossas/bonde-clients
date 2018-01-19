import React from 'react'

export default ({ data, fieldName, onSelectItem }) => (data.length !== 0 ? (
  <ul>
  {data.map(obj => (
    <li key={obj.id}>
      <a onClick={() => onSelectItem && onSelectItem(obj)}>
        {obj[fieldName || 'name']}
      </a>
    </li>
  ))}
  </ul>
) : (<p>Você não possui nenhuma mobilização!</p>))
