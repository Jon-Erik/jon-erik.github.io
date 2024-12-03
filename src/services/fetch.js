export async function req ({
	url,
  	method,
    headers = { "Content-Type": "application/json" },
    body,
    params
}) {
    const paramsString = new URLSearchParams(params).toString()
    const response = await fetch(`${url}?${paramsString}`, { method, headers, body: JSON.stringify(body) })
    const parsed = await response.json();
    return parsed;
}