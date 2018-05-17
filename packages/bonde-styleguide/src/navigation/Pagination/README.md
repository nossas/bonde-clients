### Pagination - default

```js
<Pagination />
```


### Pagination - `pages`

```js
<Pagination pages={10} />
```


### Pagination - `activeIndex`

```js
<Pagination pages={5} activeIndex={4} />
```


### Pagination - callbacks

```js
<Pagination
  pages={6}
  onClickFirst={index => alert(`onClickFirst[${index}]`)}
  onClickPrev={index => alert(`onClickPrev[${index}]`)}
  onClickNext={index => alert(`onClickNext[${index}]`)}
  onClickLast={index => alert(`onClickLast[${index}]`)}
  onClickItem={index => alert(`onClickItem[${index}]`)}
/>
```


### Pagination - customizations

```js
<Pagination
  pages={5}
  activeIndex={2}
  textPrev='précédent'
  textNext='prochain'
  iconFirst='star'
  iconLast='star'
  activeColor='#00C08A'
/>
```
