/**
 * Concat class names
 * @param {string} classNames class Names
 */
export default function conclass(...classNames) {
  return classNames.join(' ').trim();
}
