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

export async function deleteOne(key, id, idUsuario) {
  let elements = await getAll(key);
  const elementRemove = elements.filter(
    (element) =>
      element.juegoId == id && element.usuarioId.id.trim() == idUsuario.trim()
  );
  if (elementRemove.length > 0) {
    const index = elements.indexOf(elementRemove[0]);
    if (index > -1) {
      elements.splice(index, 1);
    }
  }

  pushDB(key, elements).catch((err) => console.log(err));
}
