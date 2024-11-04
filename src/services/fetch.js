export default async function req ({
	url,
  	method,
    headers = { "Content-Type": "application/json" },
    body,
}) {
    const response = await fetch(url, { method, headers, body: JSON.stringify(body) })
    const parsed = await response.json();
    return parsed;
}