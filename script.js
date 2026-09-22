const tokens = document.querySelectorAll(".token-card");

tokens.forEach((token) => {
    token.addEventListener("click", () => {
        const name = token.querySelector("h2").textContent;
        const price = token.querySelector(".price").textContent;

        alert(`${name}\nCurrent price: ${price}`);
    });
});
