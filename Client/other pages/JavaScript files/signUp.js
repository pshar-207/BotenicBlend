// SignUp
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate the form
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const emailuser = document.querySelector(".userEmail").value;
    console.log(emailuser);

    if (!emailuser) {
      console.log("email empty");
    }

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        email: emailuser,
        password: document.querySelector(".user_password").value,
      }),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url; // Follow redirect
        } else {
          return response.json(); // Handle other responses
        }
      })
      .then((data) => {
        if (data.message === "User created successfully") {
          alert("Your account has been created!");
          console.log("created");
        } // Handle success response
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
      });
  });
});

function validateForm() {
  var password = document.querySelector(".user_password").value;
  var confirmPassword = document.querySelector(".userConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }
  return true;
}
