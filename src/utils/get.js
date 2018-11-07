export default function get(object, key, defaultValue) {
  const [first, ...rest] = key.replace(/ .[\d]/g, '.').split('.');

  if (!rest.length) {
    return object[first] || defaultValue;
  }

  return get(object[first], rest.join('.'));
}
