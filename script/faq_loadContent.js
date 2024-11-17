const fillFaqData = async () => {
  const newTranslations = await fetchTranslationsFor(
    localStorage.getItem("lang")
  );
  const faqContainer = document.getElementById("faq-container");

  // Clear existing content
  faqContainer.innerHTML = "";

  newTranslations.faqData.forEach((faq, idx) => {
    const faqItem = `
        <div class="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
            <button
                type="button"
                id="question${idx + 1}"
                data-state="closed"
                class="flex items-center justify-between w-full px-4 py-5 sm:p-6"
            >
                <span class="flex text-lg font-semibold text-black">${
                  faq.title
                }</span>
                <svg
                    id="arrow${idx + 1}"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-6 h-6 text-gray-400"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            <div
                id="answer${idx + 1}"
                style="display: none"
                class="px-4 pb-5 sm:px-6 sm:pb-6"
            >
                <p>${faq.description}</p>
            </div>
        </div>
    `;
    faqContainer.innerHTML += faqItem;
  });

  attachEventListeners();
};

const attachEventListeners = () => {
  document
    .querySelectorAll('[id^="question"]')
    .forEach(function (button, index) {
      button.addEventListener("click", function () {
        var answer = document.getElementById("answer" + (index + 1));
        var arrow = document.getElementById("arrow" + (index + 1));

        if (answer.style.display === "none" || answer.style.display === "") {
          answer.style.display = "block";
          arrow.style.transform = "rotate(0deg)";
        } else {
          answer.style.display = "none";
          arrow.style.transform = "rotate(-180deg)";
        }
      });
    });
};

document.addEventListener("DOMContentLoaded", () => {
  fillFaqData();
});
