import { getAll, pushDB } from "./vercelVKFuntions";

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

  let usuarios = await getAll("users");

  let yaExiste = false;
  if (usuarios) {
    yaExiste = usuarios.find(
      (usuario) => usuario.email === email && usuario.password === password
    );
  }

  if (yaExiste) {
    console.log(yaExiste);
    localStorage.setItem("logeado", JSON.stringify(yaExiste.id));
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

  let usuarios = await getAll("users");

  let yaExiste = false;
  if (usuarios) {
    yaExiste = usuarios.find(
      (usuario) => usuario.email === email && usuario.password === password
    );
  }

  if (yaExiste) {
    alert("El usuario ya existe");
  } else {
    if (password !== passwordConfirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const user = {
      id,
      email,
      password,
    };

    usuarios.push(user);
    pushDB("users", usuarios);

    setTimeout(() => {
      formLogin.style.display = "block";
      formRegister.style.display = "none";
    }, 2000);
  }
});
