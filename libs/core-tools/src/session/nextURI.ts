export default (uri: string): string => {
  return `${uri}?next=${window.location.href}`;
};
