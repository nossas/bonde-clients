### Pagination - default

```js
<Pagination onChangePage={i => i} />
```


### Pagination - `pages`

```js
<Pagination onChangePage={i => i} pages={10} />
```


### Pagination - `pageIndex`

```js
<Pagination onChangePage={i => i} pages={5} pageIndex={4} />
```


### Pagination - callbacks

```js
<Pagination
  pages={6}
  onChangePage={index => alert(`onChangePage[${index}]`)}
/>
```


### Pagination - customizations

```js
<Pagination
  onChangePage={i => i}
  pages={5}
  pageIndex={2}
  textPrev='précédent'
  textNext='prochain'
  iconFirst='star'
  iconLast='star'
  activeColor='#00C08A'
/>
```
