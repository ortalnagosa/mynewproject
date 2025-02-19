document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const nameRegex = /^[a-zA-Zא-ת\s]+$/;
  const nameInput = document.getElementById("text").value;
  if (!nameRegex.test(nameInput)) {
    alert("יש למלא שם מלא תקני");
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const emailInput = document.getElementById("email").value;
  if (!emailRegex.test(emailInput)) {
    alert("יש למלא מייל תקני");
    return;
  }

  const phoneRegex = /^[0-9]{10}$/;
  const phoneInput = document.getElementById("number").value;
  if (!phoneRegex.test(phoneInput)) {
    alert("יש למלא מספר טלפון תקני");
    return;
  }

  if (
    nameRegex.test(nameInput) &&
    emailRegex.test(emailInput) &&
    phoneRegex.test(phoneInput)
  ) {
      alert("הפרטים נשלחו בהצלחה!");
      document.querySelector("form").submit();
  }
});
