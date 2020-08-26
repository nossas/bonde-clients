import React from "react";
import { FormSpy, diff } from "bonde-components";

type Values = {
  [x: string]: { value: string | number; label: string } & string;
};

type MyProps = {
  values: Values;
  save: (e: Values) => Promise<any>;
  active?: string;
};

type MyState = {
  values: Values;
  active?: string;
};

class AutoSave extends React.Component<MyProps, MyState> {
  state = { values: this.props.values, active: this.props.active };
  promise: any;

  componentDidUpdate(_prevProps: MyProps, prevState: MyState) {
    if (prevState.active !== this.state.active) {
      this.save();
    }
  }

  static getDerivedStateFromProps(nextProps: MyProps, prevState: MyState) {
    if (nextProps.active !== prevState.active) {
      console.log({ active: nextProps.active });
      return { active: nextProps.active };
    } else return null;
  }

  save = async () => {
    if (this.promise) {
      await this.promise;
    }
    const { values, save } = this.props;

    // This diff step is totally optional
    const difference = diff(this.state.values, values);
    if (Object.keys(difference).length) {
      // values have changed
      this.setState({ values });
      // setFieldData(blurredField, { saving: true });
      this.promise = save(difference as any);
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
