const body = document.querySelector("body");
const form = document.querySelector("form");

const registerBtn = document.querySelector(".registerBtn");
const userName = document.querySelector(".userName");
const phoneNumber = document.querySelector(".phoneNumber");
const userEmail = document.querySelector(".userEmail");
const userPassword = document.querySelector(".userPassword");

const login = document.querySelector(".login");
const loginPassword = document.querySelector(".loginPassword");
const loginForm = document.querySelector(".loginForm");

const users = JSON.parse(localStorage.getItem("users")) || [];
const statusMsgContainer = document.querySelector(".statusMsg");

function clearInputFields(...inputs) {
  inputs.forEach((e) => (e.value = ""));
}
// function //clearErrorMsg() {
//   const statusMsgContainer = document.querySelector(".statusMsg");
//   statusMsgContainer.remove();
// }
function renderRegistrationErrorMsg(msgArr, nameOfField) {
  if (document.querySelector(".statusMsg") === null) {
    const statusMsgContainer = document.createElement("div");
    const errorHeader = document.createElement("h1");
    const errorMsg = document.createElement("p");
    const listOfCriteria = document.createElement("ul");
    errorHeader.textContent = `Invalid ${nameOfField} Entry`;
    errorMsg.textContent = `Please enter a valid ${nameOfField} that meets the following criteria:`;
    msgArr.forEach((e) => {
      const li = document.createElement("li");
      li.innerHTML = e;
      listOfCriteria.appendChild(li);
    });

    statusMsgContainer.setAttribute("class", "statusMsg");
    statusMsgContainer.append(errorHeader, errorMsg, listOfCriteria);
    body.append(statusMsgContainer);
  } else {
    const errorHeader = document.querySelector("h1");
    const errorMsg = document.querySelector("p");
    const listOfCriteria = document.querySelector("ul");
    while (listOfCriteria.firstChild) {
      listOfCriteria.removeChild(listOfCriteria.firstChild);
    }

    errorHeader.textContent = `Invalid ${nameOfField} Entry`;
    errorMsg.textContent = `Please enter a valid ${nameOfField} that meets the following criteria:`;
    msgArr.forEach((e) => {
      const li = document.createElement("li");
      li.innerHTML = e;
      listOfCriteria.appendChild(li);
    });
  }
}

function renderRegistrationSuccessfulMsg() {
  if (document.querySelector(".statusMsg") === null) {
    const statusMsgContainer = document.createElement("div");
    const msgHeader = document.createElement("h1");
    const msg = document.createElement("p");
    msgHeader.textContent = "Registration Successful!";
    msg.textContent =
      "Congratulations! Your registration has been completed successfully.";
    statusMsgContainer.append(msgHeader, msg);
    statusMsgContainer.classList.add("statusMsg");
    statusMsgContainer.classList.add("success");
    body.append(statusMsgContainer);
  } else {
    const statusMsgContainer = document.querySelector("div");
    const msgHeader = document.querySelector("h1");
    const msg = document.querySelector("p");
    const listOfCriteria = document.querySelector("ul");
    while (listOfCriteria.firstChild) {
      listOfCriteria.removeChild(listOfCriteria.firstChild);
    }
    msgHeader.textContent = "Registration Successful!";
    msg.textContent =
      "Congratulations! Your registration has been completed successfully.";
    statusMsgContainer.classList.add("success");
  }
}
function isValidName(name) {
  let minSymbols = 2;
  let maxSymbols = 24;
  let letterCheck = /^[a-zA-Z]+$/.test(name) ? true : false;
  if (name.length < minSymbols || name.length > maxSymbols || !letterCheck) {
    renderRegistrationErrorMsg(
      [
        "Contains only letters",
        `Minimum length of ${minSymbols} characters`,
        `Maximum length of ${maxSymbols} characters`,
      ],
      "Name"
    );
    return false;
  } else {
    //clearErrorMsg();
    return true;
  }
}

function isValidEmail(email) {
  let minSymbols = 7;
  let atCheck = email.includes("@");
  if (email.length < minSymbols || !atCheck) {
    renderRegistrationErrorMsg(
      ["Should contains @", `Minimum length of ${minSymbols}`],
      "Email"
    );
    return false;
  } else {
    //clearErrorMsg();
    return true;
  }
}
function isValidPhoneNumber(phoneNumber) {
  let isFirstSymbolPlus = phoneNumber[0] === "+" ? true : false;
  let isOnlyNumber = /^\d+$/.test(phoneNumber.slice(1));
  let minNumbers = 8;
  let maxNumbers = 12;
  if (
    phoneNumber.length < minNumbers ||
    phoneNumber.length > maxNumbers ||
    !isFirstSymbolPlus ||
    !isOnlyNumber
  ) {
    renderRegistrationErrorMsg(
      [
        "Should be only numbers",
        `Minimum length of ${minNumbers} numbers`,
        `Maximum length of ${maxNumbers} numbers`,
      ],
      "Phone number"
    );
    return false;
  } else {
    //clearErrorMsg();
    return true;
  }
}
function isValidPassword(password) {
  let minSymbols = 5;
  let maxSymbols = 26;
  if (password.length < minSymbols || password.length > maxSymbols) {
    renderRegistrationErrorMsg(
      [
        `Minimum length of ${minSymbols} characters`,
        `Maximum length of ${maxSymbols} characters`,
      ],
      "Password"
    );
    return false;
  } else {
    //clearErrorMsg();
    return true;
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    isValidName(userName.value) &&
    isValidPhoneNumber(phoneNumber.value) &&
    isValidEmail(userEmail.value) &&
    isValidPassword(userPassword.value)
  ) {
    const userData = {
      name: userName.value,
      phoneNumber: phoneNumber.value,
      email: userEmail.value,
      password: userPassword.value,
    };
    renderRegistrationSuccessfulMsg();
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    clearInputFields(userName, userEmail, phoneNumber, userPassword);
  }
});
function renderLoginMsg() {
  const statusMsgContainer = document.createElement("div");
  const loginMsg = document.createElement("h1");
  loginMsg.textContent = "Login Successful";
  statusMsgContainer.append(loginMsg);
  statusMsgContainer.classList.add("statusMsg");
  statusMsgContainer.classList.add("success");
  body.append(statusMsgContainer);
}
function renderErrorLoginMsg() {
  const statusMsgContainer = document.createElement("div");
  const loginMsg = document.createElement("h1");
  loginMsg.textContent = "Login Failed";
  statusMsgContainer.append(loginMsg);
  statusMsgContainer.classList.add("statusMsg");
  statusMsgContainer.classList.add("failed");
  body.append(statusMsgContainer);
}
function checkLogin(login, password) {
  const userData = JSON.parse(localStorage.getItem("users"));
  let result = false;
  userData.some((e) => {
    if (e.email === login && e.password === password) {
      result = true;
    }
  });
  return result;
}
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let loginEmail = login.value;
  let loginPwd = loginPassword.value;
  let check = checkLogin(loginEmail, loginPwd);
  if (check) {
    renderLoginMsg();
  } else {
    renderErrorLoginMsg();
  }
});
