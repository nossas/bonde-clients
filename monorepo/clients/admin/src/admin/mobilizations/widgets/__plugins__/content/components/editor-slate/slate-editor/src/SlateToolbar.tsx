import classnames from 'classnames';
import { Children, cloneElement } from 'react';

export default function SlateToolbar({ children, style, className, ...rest }): JSX.Element {
  return <div className={classnames('editor--toolbar', className)} style={style}>
    {Children.map(children, (child) => cloneElement(child, rest))}
  </div>
}
