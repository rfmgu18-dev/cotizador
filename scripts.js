//Constantes
const form = document.querySelector("#coin-form");
const coin = document.querySelector("#coin");
const crypto = document.querySelector("#crypto");
const amount = document.querySelector("#amount");
const coinInfo = document.querySelector("#coin-info");

form.addEventListener("submit", async event => {
    event.preventDefault();
    const coinSelected = coin.value;
    const cryptoSelected = crypto.value;
    const amountValue = Number(amount.value);
    if (!Number.isNaN(amountValue) && amountValue > 0)
    console.log(coinSelected, cryptoSelected, amountValue);
    
    try{
        coinInfo.innerHTML = 
        `<div class="loader"></div>`;
        const response = await(await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        const display = response.DISPLAY[cryptoSelected][coinSelected];
        const raw = response.RAW[cryptoSelected][coinSelected];

        const price = display.PRICE;
        const high24h = display.HIGH24HOUR;
        const low24h = display.LOW24HOUR;
        const porcent24h = display.CHANGEPCT24HOUR;
        const rawPrice = raw.PRICE;

        const lines = [
            `<p class="info">El precio del ${cryptoSelected} es de: <span class="price">${price}</span></p>`,
            `<p class="info">El precio más alto es: <span class="price">${high24h}</span></p>`,
            `<p class="info">El precio más bajo es: <span class="price">${low24h}</span></p>`,
            `<p class="info">Variación del ${cryptoSelected} en 24H: <span class="price">${porcent24h}%</span></p>`
        ];

        if (amountValue !== "") {
            const result = Number(amountValue) / rawPrice;
            lines.push(`<p class="info">Puedes comprar: <span class="price">${result.toFixed(4)} ${cryptoSelected}</span> unidades</p>`);
        }

        coinInfo.innerHTML = lines.join("");

    } catch (error) {
        console.log(error);
    }        
})