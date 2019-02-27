const fetch = require('node-fetch')

const search = async ({ getUrl, parser }) => {
  const url = getUrl()
  const request = await fetch(url)
  const data = await request.json()
  return parser(data)
}

module.exports = { search }
