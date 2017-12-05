export default (obj, path) =>
  path.split('.').reduce((xs, x) =>
    (xs && xs[x]) ? xs[x] : null, obj)
