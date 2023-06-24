const URL_VK = import.meta.env.VITE_KV_REST_API_URL;
const TOKEN_VK = import.meta.env.VITE_KV_REST_API_TOKEN;
export async function getAll(key) {
  let all = [];
  let elements = await fetch(`${URL_VK}/get/${key}`, {
    headers: {
      Authorization: `Bearer ${TOKEN_VK}`,
    },
  }).then((response) => response.json());

  if (elements.result) {
    all = JSON.parse(elements.result);
  }

  return all;
}

export async function pushDB(key, data) {
  await fetch(`${URL_VK}/set/${key}`, {
    headers: {
      Authorization: `Bearer ${TOKEN_VK}`,
    },
    body: JSON.stringify(data),
    method: "POST",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export async function deleteOne(key, id) {
  const elements = await getAll(key);
  const elementsUpdated = elements.filter((element) => element.juegoId != id);
  pushDB(key, elementsUpdated).catch((err) => console.log(err));
}
