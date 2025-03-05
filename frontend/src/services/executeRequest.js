export default function executeRequest(code) {
  const request = new Request('https://emkc.org/api/v2/piston/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      language: "javascript",
      version: "1.32.3",
      files: [
        {
          content: code
        }
      ]
    })
  })
  return request
}