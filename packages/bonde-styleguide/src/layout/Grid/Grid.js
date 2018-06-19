import styled from 'styled-components'

/**
 * Gris system that wraps multiple `Cell` components.
 */
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-gap: 30px;
`

Grid.displayName = 'Grid'

/* @component */
export default Grid
