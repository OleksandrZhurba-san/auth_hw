const body = document.querySelector("body");
const form = document.querySelector("form");

const registerBtn = document.querySelector(".registerBtn");
const userName = document.querySelector(".userName");
const lastName = document.querySelector(".lastName");
const userEmail = document.querySelector(".userEmail");
const userPassword = document.querySelector(".userPassword");

const statusMsg = document.createElement("p");
body.append(statusMsg);

const login = document.querySelector(".login");
const loginPassword = document.querySelector(".loginPassword");
const loginForm = document.querySelector(".loginForm");

const users = JSON.parse(localStorage.getItem("users")) || [];

const nameValidation = {
  minSymbols: 2,
  maxSymbols: 24,
  isOnlyLetters: function (name) {
    let check = /^[a-zA-Z]+$/.test(name) ? true : false;
    return check;
  },
};
const emailValidation = {
  minSymbols: 7,
  isAtPresent: function (email) {
    let check = email.includes("@");
    return check;
  },
};
const phoneValidation = {
  isFirstSymbolPlus: function (number) {
    let check = number[0] === "+" ? true : false;
    return check;
  },
  isOnlyNumbers: function (number) {
    let check = /^\d+$/.test(number.slice(1));
    return check;
  },
  maxNumbers: 12,
  minNumbers: 8,
};
const passwordValidation = {
  minSymbols: 5,
  maxSymbols: 26,
};

function isEmpty(field, element) {
  const isEmpty =
    field.value === ""
      ? (element.textContent = `${field.placeholder} couldn't be empty!`)
      : false;
  return isEmpty;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    userName.value &&
    lastName.value &&
    userEmail.value &&
    userPassword.value
  ) {
    const userData = {
      name: userName.value,
      lastName: lastName.value,
      email: userEmail.value,
      password: userPassword.value,
    };

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    setStatusMsg(statusMsg, "ok", "You have been registered successfully!");
    clearInputFields(userName, userEmail, lastName, userPassword);
  } else {
    setStatusMsg(statusMsg, "error", "Please fill all fields");
  }
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkLogin(users)) {
    setStatusMsg(statusMsg, "ok", "You successfully logged in!");
  } else {
    setStatusMsg(statusMsg, "error", "Login data doesn't exist!");
  }
});

function checkLogin(listOfUsers) {
  let status = false;
  listOfUsers.forEach((e) => {
    if (e.email === login.value && e.password === loginPassword.value) {
      status = true;
    }
  });
  return status;
}
function setStatusMsg(text, err, msgText) {
  if (err === "ok") {
    text.textContent = msgText;
    text.style.color = "green";
  } else {
    text.textContent = msgText;
    text.style.color = "red";
  }
}

function clearInputFields(...inputs) {
  inputs.forEach((e) => (e.value = ""));
}
