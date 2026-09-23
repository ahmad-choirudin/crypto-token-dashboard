const tokens = [
    {
        name: "Bitcoin",
        symbol: "BTC",
        price: 108420,
        change: 2.41,
        marketCap: "2.16T"
    },

    {
        name: "Ethereum",
        symbol: "ETH",
        price: 4285.32,
        change: 1.74,
        marketCap: "516.2B"
    },

    {
        name: "Solana",
        symbol: "SOL",
        price: 198.42,
        change: 4.82,
        marketCap: "95.7B"
    },

    {
        name: "Chainlink",
        symbol: "LINK",
        price: 24.81,
        change: 0.92,
        marketCap: "15.9B"
    },

    {
        name: "Avalanche",
        symbol: "AVAX",
        price: 31.44,
        change: -1.21,
        marketCap: "13.1B"
    },

    {
        name: "Sui",
        symbol: "SUI",
        price: 3.74,
        change: 3.67,
        marketCap: "10.8B"
    }
];


let watchlist = [];


const tokenTable = document.getElementById("tokenTable");
const searchInput = document.getElementById("searchInput");
const watchlistItems = document.getElementById("watchlistItems");
const tokenCount = document.getElementById("tokenCount");


function formatPrice(price) {

    if (price >= 1000) {
        return "$" + price.toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
    }

    return "$" + price.toFixed(2);
}


function renderTokens(list = tokens) {

    tokenTable.innerHTML = "";

    list.forEach((token) => {

        const row = document.createElement("tr");

        const changeClass =
            token.change >= 0
                ? "change-positive"
                : "change-negative";

        const changeSymbol =
            token.change >= 0
                ? "+"
                : "";

        const isWatched =
            watchlist.includes(token.symbol);

        row.innerHTML = `

            <td>

                <div class="token-name">

                    <div class="token-icon">
                        ${token.symbol.substring(0, 1)}
                    </div>

                    <div>
                        <strong>${token.name}</strong>

                        <div class="symbol">
                            ${token.symbol}
                        </div>
                    </div>

                </div>

            </td>


            <td>
                ${formatPrice(token.price)}
            </td>


            <td class="${changeClass}">
                ${changeSymbol}${token.change}%
            </td>


            <td>
                $${token.marketCap}
            </td>


            <td>

                <button
                    class="star-btn"
                    onclick="toggleWatchlist('${token.symbol}')"
                    title="Add to watchlist"
                >
                    ${isWatched ? "★" : "☆"}
                </button>

            </td>

        `;

        tokenTable.appendChild(row);

    });

    tokenCount.textContent = tokens.length;
}


function toggleWatchlist(symbol) {

    if (watchlist.includes(symbol)) {

        watchlist = watchlist.filter(
            item => item !== symbol
        );

    } else {

        watchlist.push(symbol);

    }

    renderTokens();
    renderWatchlist();
}


function renderWatchlist() {

    if (watchlist.length === 0) {

        watchlistItems.innerHTML = `

            <div class="empty-state">

                <span>☆</span>

                <p>No tokens added yet.</p>

                <small>
                    Click the star beside a token to add it.
                </small>

            </div>

        `;

        return;
    }


    watchlistItems.innerHTML = "";


    watchlist.forEach(symbol => {

        const token = tokens.find(
            item => item.symbol === symbol
        );

        if (!token) return;


        const item = document.createElement("div");

        item.className = "watch-item";

        item.innerHTML = `

            <div>

                <div class="watch-name">
                    ${token.name}
                </div>

                <div class="watch-price">
                    ${formatPrice(token.price)}
                </div>

            </div>


            <div class="${
                token.change >= 0
                    ? "change-positive"
                    : "change-negative"
            }">

                ${
                    token.change >= 0
                        ? "+"
                        : ""
                }${token.change}%

            </div>

        `;

        watchlistItems.appendChild(item);

    });
}


/* SEARCH */

searchInput.addEventListener(
    "input",
    function () {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        const filteredTokens =
            tokens.filter(token =>

                token.name
                    .toLowerCase()
                    .includes(query)

                ||

                token.symbol
                    .toLowerCase()
                    .includes(query)

            );


        renderTokens(filteredTokens);

    }
);


/* REFRESH */

document
    .getElementById("refreshButton")
    .addEventListener(
        "click",
        function () {

            const button =
                document.getElementById(
                    "refreshButton"
                );

            button.textContent = "Refreshing...";


            setTimeout(() => {

                button.textContent = "Refresh";

                renderTokens();

            }, 700);

        }
    );


/* DARK MODE */

document
    .getElementById("themeButton")
    .addEventListener(
        "click",
        function () {

            document.body.classList.toggle("dark");

        }
    );


/* INITIAL LOAD */

renderTokens();
renderWatchlist();
