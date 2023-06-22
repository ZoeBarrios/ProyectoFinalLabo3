const urlJsonServer = import.meta.env.VITE_API_URL_JSONSERVER;
const formLogin = document.querySelector("#login");
const formRegister = document.querySelector("#register");
const anchorLogin = document.querySelector(".anchorLogin");
const anchorRegister = document.querySelector(".anchorRegister");

formRegister.style.display = "none";
anchorLogin.addEventListener("click", (e) => {
  e.preventDefault();
  formLogin.style.display = "block";
  formRegister.style.display = "none";
});

anchorRegister.addEventListener("click", (e) => {
  e.preventDefault();
  formLogin.style.display = "none";
  formRegister.style.display = "block";
});

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;

  const yaExiste = await fetch(
    `${urlJsonServer}/usuarios?email=${email}&password=${password}`
  ).then((res) => res.json());
  if (yaExiste.length > 0) {
    localStorage.setItem("logeado", JSON.stringify(yaExiste[0].id));
    window.location.href = "/index.html";
  } else {
    alert("El usuario no existe");
  }
});

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#registerEmail").value;
  const password = document.querySelector("#registerPassword").value;
  const passwordConfirmation = document.querySelector(
    "#registerPasswordConfirmation"
  ).value;
  const timestamp = Date.now();
  const id = `ID_${timestamp}`;

  const yaExiste = await fetch(
    `${urlJsonServer}/usuarios?email=${email}&password=${password}`
  ).then((res) => res.json());

  if (yaExiste == []) {
    alert("El usuario ya existe");
  } else {
    if (password !== passwordConfirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const nuevoUsuario = {
      id,
      email,
      password,
    };
    await fetch(`${urlJsonServer}/usuarios/POST`, nuevoUsuario);
    alert("Usuario creado correctamente");
    setTimeout(() => {
      formLogin.style.display = "block";
      formRegister.style.display = "none";
    }, 2000);
  }
});
