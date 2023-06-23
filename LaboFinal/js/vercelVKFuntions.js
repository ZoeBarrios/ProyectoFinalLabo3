export async function getAll(key) {
  let all = [];
  let elements = await fetch(
    `${import.meta.env.VITE_KV_REST_API_URL}/get/${key}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_KV_REST_API_TOKEN}`,
      },
    }
  ).then((response) => response.json());

  if (elements.result) {
    all = JSON.parse(elements.result);
  }

  return all;
}

export async function pushDB(key, data) {
  await fetch(`${import.meta.env.VITE_KV_REST_API_URL}/set/${key}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_KV_REST_API_TOKEN}`,
    },
    body: JSON.stringify(data),
    method: "POST",
  })
    .then((response) => alert("Usuario creado correctamente"))
    .catch((err) => console.log(err));
}
