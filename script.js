document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const responseMessage = document.getElementById("responseMessage");
  responseMessage.innerText = "Sending message...";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation
  if (!name || !email || !message) {
    responseMessage.innerText = "Please fill all fields.";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (response.ok) {
      responseMessage.innerText = result.message;
      document.getElementById("contactForm").reset();
    } else {
      responseMessage.innerText = result.message || "Error sending message";
    }
  } catch (error) {
    console.error("Error:", error);
    responseMessage.innerText = "Server error. Please try again later.";
  }
});