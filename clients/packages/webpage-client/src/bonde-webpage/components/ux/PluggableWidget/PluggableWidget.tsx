import React from 'react';
import Overlay from './Overlay';

const PluggableWidget = (props: any) => {
  const getOptions = (plugin: any) => {
    let options = { noOverlay: !props.editable };
    if (typeof plugin?.options === 'function') {
      options = Object.assign({}, options, plugin.options(props));
    } else if (typeof plugin?.options === 'object') {
      options = Object.assign({}, options, plugin.options);
    }
    return options;
  };

  const { block, widget, extraWidgetProps, onEdit, onDelete } = props;

  const plugin = extraWidgetProps.plugins.find(
    (p: any) => p.kind === widget.kind
  );

  const { noOverlay } = getOptions(plugin);

  const widgetProps = {
    block,
    widget,
    ...extraWidgetProps,
  };

  return !noOverlay ? (
    <Overlay
      onEdit={() => onEdit && onEdit(widget)}
      onDelete={() => onDelete && onDelete(widget)}
    >
      <plugin.component {...widgetProps} />
    </Overlay>
  ) : (
    <plugin.component {...widgetProps} />
  );
};

PluggableWidget.defaultProps = {
  editable: false,
  plugins: [],
};

export default PluggableWidget;
