import { getAll, pushDB } from "./vercelVKFuntions";

const containerLoginEl = document.querySelector(".container-login");
const containerRegisterEl = document.querySelector(".container-register");
const formLogin = document.querySelector("#login");
const formRegister = document.querySelector("#register");
const anchorLogin = document.querySelector(".anchorLogin");
const anchorRegister = document.querySelector(".anchorRegister");
const togglePasswordButton = document.querySelectorAll(".togglePassword");
const passwordInput = document.querySelectorAll(
  "#loginPassword , #registerPassword"
);

togglePasswordButton.forEach((button) => {
  button.addEventListener("click", function () {
    passwordInput.forEach((input) => {
      if (input.type === "password") {
        togglePasswordButton.forEach((button) => {
          button.style.color = "#4e9eff";
        });
        input.type = "text";
      } else {
        togglePasswordButton.forEach((button) => {
          button.style.color = "black";
        });
        input.type = "password";
      }
    });
  });
});

anchorLogin.addEventListener("click", (e) => {
  e.preventDefault();
  containerLoginEl.style.display = "flex";
  containerRegisterEl.style.display = "none";
});

anchorRegister.addEventListener("click", (e) => {
  e.preventDefault();
  containerLoginEl.style.display = "none";
  containerRegisterEl.style.display = "flex";
});

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#loginEmail").value;
  const password = document.querySelector("#loginPassword").value;
  const user = document.querySelector("#loginUser").value;

  let usuarios = await getAll("users");

  let yaExiste = false;
  if (usuarios) {
    yaExiste = usuarios.find(
      (usuario) =>
        usuario.email === email &&
        usuario.password === password &&
        usuario.user === user
    );
  }

  if (yaExiste) {
    console.log(yaExiste);
    localStorage.setItem(
      "logeado",
      JSON.stringify({ id: yaExiste.id, user: user })
    );
    window.location.href = "/index.html";
  } else {
    alert("El usuario no existe");
  }
});

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#registerEmail").value;
  const password = document.querySelector("#registerPassword").value;
  const userInput = document.querySelector("#registerUser").value;
  const passwordConfirmation = document.querySelector(
    "#registerPasswordConfirmation"
  ).value;
  const timestamp = Date.now();
  const id = `ID_${timestamp}`;

  let usuarios = await getAll("users");

  let yaExiste = false;
  if (usuarios) {
    yaExiste = usuarios.find(
      (usuario) =>
        usuario.email === email &&
        usuario.password === password &&
        usuario.user === userInput
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
      user: userInput,
    };

    usuarios.push(user);
    pushDB("users", usuarios);

    setTimeout(() => {
      containerLoginEl.style.display = "flex";
      containerRegisterEl.style.display = "none";
    }, 2000);
  }
});
