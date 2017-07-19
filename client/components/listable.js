import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

export const Listable = ({
  data,
  onClickRow,
  selectedRow,
  listComponent: ListComponent,
  rowComponent: RowComponent
}) => (
  <ListComponent className={classnames('listable', { 'selectable': onClickRow })}>
    {data && data.map((item, index) => (
      <RowComponent
        item={item}
        active={index === selectedRow}
        onClick={() => onClickRow && onClickRow(item, index)}
      />
    ))}
  </ListComponent>
)

Listable.propTypes = {
  data: PropTypes.array,
  onClickRow: PropTypes.func,
  listComponent: PropTypes.node,
  rowComponent: PropTypes.node,
  selectedRow: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ])
}

Listable.defaultProps = {
  listComponent: 'div'
}

export const Row = ({
  item,
  onClick,
  active,
  className,
  style,
  children
}) => {
 
 return (
    <div
      className={classnames('flex row clearfix', className, { 'active': active })}
      style={{
        ...style,
        cursor: onClick ? 'pointer' : 'none'
      }}
      onClick={onClick}
    >
      {children && children({ item })}
    </div>
  )
}

Row.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  onClick: PropTypes.func,
  children: PropTypes.func,
  active: PropTypes.bool
}

Row.defaultProps = {
  style: {}
}

export const ColumnHOC = ({ defaultClassName, defaultComponent, style }) => ({
  children,
  value,
  size,
  smSize,
  lgSize
}) => {

  const Column = defaultComponent ? defaultComponent : 'div'
  
  return (
    <Column
      style={style}
      className={classnames(
        'col',
        `col-${size} md-col-${size}`,
        smSize ? `sm-col-${smSize}` : null,
        lgSize ? `lg-col-${lgSize}` : null,
        defaultClassName
      )}
    >
      {value || children}
    </Column>
  )
}
