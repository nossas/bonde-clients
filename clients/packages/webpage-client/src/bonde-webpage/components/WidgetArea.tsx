import React, { useMemo } from 'react';
import {
  PluggableWidget,
} from '../';


const WidgetArea = ({
  block,
  widget,
  targets,
  mobilization
}: any) => {
  const { sm_size, md_size, lg_size } = widget;
  const containerClass = `widget px2 mb4 md-mb0 col col-${sm_size} sm-col-${sm_size} md-col-${md_size} lg-col-${lg_size}`;
  const memoContainerClass = useMemo(() => containerClass, [])
  return (
    <div className={memoContainerClass}>
      <PluggableWidget
        block={block}
        widget={widget}
        mobilization={mobilization}
        targets={targets}
      />
    </div>
  );
};

export default WidgetArea;
