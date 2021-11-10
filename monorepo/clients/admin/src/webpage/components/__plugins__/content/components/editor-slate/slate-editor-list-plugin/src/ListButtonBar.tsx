
import { OrderedListButton, UnorderedListButton } from '.'

// FIXME: Needs to handle assets files to work with SSR
import('./ListButtonBar.css')


function ListButtonBar(properties) {
  return <div className='slate-list-plugin--button-bar'>
    <UnorderedListButton {...properties} />
    <OrderedListButton {...properties} />
  </div>
}

export default ListButtonBar
