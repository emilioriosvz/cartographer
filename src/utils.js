
const parseParams = params => Object.keys(params).reduce((pre, acc) => {
  const value = `${encodeURIComponent(acc)}=${encodeURIComponent(params[acc])}`
  pre = pre ? pre += `&${value}` : value
  return pre
}, '')

module.exports = {
  parseParams
}
