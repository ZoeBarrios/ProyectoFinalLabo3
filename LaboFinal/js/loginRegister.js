import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/mint.css";
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

  const email = document.querySelector("#loginEmail");
  const password = document.querySelector("#loginPassword");
  const user = document.querySelector("#loginUser");

  if (validate([user, email, password]) == false) return;

  let usuarios = await getAll("users");

  let yaExiste = false;
  if (usuarios) {
    yaExiste = usuarios.find(
      (usuario) =>
        usuario.email === email.value &&
        usuario.password === password.value &&
        usuario.user === user.value
    );
  }

  if (yaExiste) {
    localStorage.setItem(
      "logeado",
      JSON.stringify({ id: yaExiste.id, user: user.value })
    );
    window.location.href = "/index.html";
  } else {
    new Noty({
      theme: "mint",
      text: "Incorrect username, email, or password",
      type: "error",
      timeout: 2000,
    }).show();
  }
});

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#registerEmail");
  const password = document.querySelector("#registerPassword");
  const userInput = document.querySelector("#registerUser");
  const passwordConfirmation = document.querySelector(
    "#registerPasswordConfirmation"
  );
  const timestamp = Date.now();
  const id = `ID_${timestamp}`;

  if (validate([userInput, email, password, passwordConfirmation]) == false)
    return;

  let usuarios = await getAll("users");

  let yaExiste = false;
  if (usuarios) {
    yaExiste = usuarios.find(
      (usuario) =>
        usuario.email === email.value &&
        usuario.password === password.value &&
        usuario.user === userInput.value
    );
  }

  if (yaExiste) {
    new Noty({
      theme: "mint",
      text: "The user already exists",
      type: "error",
      timeout: 2000,
    }).show();
  } else {
    if (password.value !== passwordConfirmation.value) {
      new Noty({
        theme: "mint",
        text: "Passwords do not match",
        type: "error",
        timeout: 2000,
      }).show();
      return;
    }
    const user = {
      id,
      email: email.value,
      password: password.value,
      user: userInput.value,
    };

    usuarios.push(user);
    pushDB("users", usuarios);

    new Noty({
      theme: "mint",
      text: "User created successfully",
      type: "success",
      timeout: 2000,
    }).show();
    setTimeout(() => {
      containerLoginEl.style.display = "flex";
      containerRegisterEl.style.display = "none";
    }, 2000);
  }
});
function validate(inputs) {
  let todoOk = true;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.value.trim() === "") {
      new Noty({
        theme: "mint",
        text: "All fields are required",
        type: "error",
        timeout: 2000,
      }).show();
      input.classList.add("error");
      todoOk = false;
      break;
    } else {
      input.classList.remove("error");
    }
  }
  return todoOk;
}
