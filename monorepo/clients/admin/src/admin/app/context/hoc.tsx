import Wrapper from './wrapper'

export default (Component) => function ({ children, ...ownProperties }) {
  return <Wrapper component={Component} {...ownProperties}>
    {children}
  </Wrapper>
}
