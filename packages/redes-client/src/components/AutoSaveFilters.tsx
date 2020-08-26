import React from "react";
import { FormSpy, diff } from "bonde-components";

type MyProps = {
  values: { [x: string]: { value: unknown; label: string } & string };
  save: (e: any) => Promise<any>;
  active?: string;
};

type MyState = {
  values: any;
  active?: string;
};

const getValues = (values: {
  [x: string]: { value: unknown; label: string } & string;
}) =>
  Object.keys(values).reduce((newObj, old) => {
    const newValue =
      typeof values[old] === "object" ? values[old].value : values[old];
    return {
      ...newObj,
      [old]: newValue,
    };
  }, {});

class AutoSave extends React.Component<MyProps, MyState> {
  state = { values: this.props.values };
  promise: any;

  UNSAFE_componentWillReceiveProps(nextProps: MyProps) {
    if (this.props.active && this.props.active !== nextProps.active) {
      // blur occurred
      this.save();
    }
  }

  save = async () => {
    if (this.promise) {
      await this.promise;
    }
    const { values, save } = this.props;
    const stripValue = getValues(values);

    // This diff step is totally optional
    const difference = diff(this.state.values, stripValue);
    if (Object.keys(difference).length) {
      // values have changed
      this.setState({ values: stripValue });
      // setFieldData(blurredField, { saving: true });
      this.promise = save(difference);
      await this.promise;
      delete this.promise;
      // this.setState({ submitting: false });
      // setFieldData(blurredField, { saving: false });
    }
  };

  render() {
    // This component doesn't have to render anything, but it can render
    // submitting state.
    return null;
  }
}

// Make a HOC
// This is not the only way to accomplish auto-save, but it does let us:
// - Use built-in React lifecycle methods to listen for changes
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in save prop nicely
export default (props: any) => (
  <FormSpy
    {...props}
    subscription={{ active: true, values: true }}
    component={AutoSave}
  />
);
