export default async function sendRequest ({
	url,
  	method,
    headers = { "Content-Type": "application/json" },
    body,
}) {
    const response = await fetch(url, { method, headers, body: JSON.stringify(body) })
    const parsed = await response.json();
    return parsed;
}