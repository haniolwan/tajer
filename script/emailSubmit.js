document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");
  const spinner = document.getElementById("spinner");
  const submitButton = document.getElementById("submitButton");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    spinner.style.display = "inline-block";

    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].disabled = true;
    }

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // change this
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        console.log("Form submitted successfully:", json);
        alert("Form submitted successfully!");

        form.reset();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to submit the form. Please try again.");
      })
      .finally(() => {
        spinner.style.display = "none";
        for (let i = 0; i < formElements.length; i++) {
          formElements[i].disabled = true;
        }
      });
  });
});
