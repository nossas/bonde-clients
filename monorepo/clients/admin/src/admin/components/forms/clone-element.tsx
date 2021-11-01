

export const cloneElement = (children, properties) => {
  if (children.length > 1) {
    return children.map(child => React.cloneElement(child, properties))
  }
  return React.cloneElement(children, properties)
}
