// “Dumb” middleware is wrapped in one more function
export default function logger(/* { dispatch, getState } */) {
  return next => action => {
    console.log(action);
    return next(action);
  };
}
