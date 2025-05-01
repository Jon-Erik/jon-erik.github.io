export async function req({
  url,
  method,
  headers = { 'Content-Type': 'application/json' },
  body,
  params
}) {
  try {
    const paramsString = new URLSearchParams(params).toString()
    // console.log({url, method, headers, body, params})
    const response = await fetch(`${url}?${paramsString}`, {
      method,
      headers,
      body: JSON.stringify(body)
    })
    const parsed = await response.json()
    return parsed
  } catch (error) {
    return {
      success: false,
      msg: error.message
    }
  }
}
