// Create a function which will throw an error based on what kind of error it is

function showError(inputElement, message, afterGroup = false) {
  const error = document.createElement("div");
  error.classList.add("error");
  error.textContent = message;

  if (afterGroup) {
    inputElement.parentNode.appendChild(error);
  } else {
    inputElement.insertAdjacentElement("afterend", error);
  }
}

// Create an array which keeps entered info and if one of them is missing it will tell us

document.addEventListener("DOMContentLoaded", function () {
  const fields = [
    { name: "First name", selector: "input[name='firstname']" },
    { name: "Last name", selector: "input[name='lastname']" },
    { name: "Email", selector: "input[name='Email']" },
    { name: "Password", selector: "input[name='Password']" },
  ];

  document.getElementById("groupform").addEventListener("submit", function (e) {
    e.preventDefault(); // Stops from refreshing a page

    // this will remove any previous errors
    document.querySelectorAll(".error").forEach((el) => el.remove());
    document
      .querySelectorAll(".error-input")
      .forEach((el) => el.classList.remove("error-input"));

    // if all validations pass it will remain true and game div will appear
    let isvalid = true;

    fields.forEach((field) => {
      const input = document.querySelector(field.selector);
      if (!input.value.trim()) {
        showError(input, `${field.name} is required`);
        input.classList.add("error-input");
        isvalid = false;
      }
    });

    // Email format
    const email = document.querySelector("input[name='Email']");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() && !emailPattern.test(email.value)) {
      showError(email, "Please enter a valid email address");
      email.classList.add("error-input");
      isValid = false;
    }

    // Password length
    const password = document.querySelector("input[name='Password']");
    if (password.value.trim() && password.value.length < 8) {
      showError(password, "Password must be at least 8 characters long");
      password.classList.add("error-input");
      isValid = false;
    }

    // Validate at least 3 technologies checked
    const checkboxes = document.querySelectorAll("input[name='technologie']");
    const checkedCount = Array.from(checkboxes).filter(
      (cb) => cb.checked
    ).length;

    if (checkedCount < 3) {
      const techGroup = checkboxes[0].closest("fieldset");
      showError(techGroup, "Choose at least 3 technologies", true);
      isValid = false;
    }

    // If everything is valid, hide form and show game
    if (isValid) {
      document.querySelector(".form-container").style.display = "none";
      document.querySelector(".game-container").style.display = "block";
    }
  });
});
