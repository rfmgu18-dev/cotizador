//Constantes
const form = document.querySelector("#coin-form");
const coin = document.querySelector("#coin");
const crypto = document.querySelector("#crypto");
const amount = document.querySelector("#amount");
const coinInfo = document.querySelector("#coin-info");


form.addEventListener("submit", async event => {
    event.preventDefault();
    const coinSelected = [...coin.children].find((option) => option.selected).value;
    const cryptoSelected = [...crypto.children].find((option) => option.selected).value;
    const amountValue = amount.value;
    console.log(coinSelected, cryptoSelected, amountValue);
    
    try{
        coinInfo.innerHTML = `
        <div class="loader"></div>
        `;
        const response = await(await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const high24h = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const low24h = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const porcent24h = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
        console.log(response.RAW[cryptoSelected][coinSelected].PRICE);
        

        if(amountValue !== "") {
            const result = Number(amountValue) / response.RAW[cryptoSelected][coinSelected].PRICE;
            coinInfo.innerHTML = `<p class="info">El precio del ${cryptoSelected} es de: <span class="price">${price}</span></p>
                <p class="info">El precio más alto es: <span class="price">${high24h}</span></p>
                <p class="info">El precio más bajo es: <span class="price">${low24h}</span></p>
                <p class="info">Variación del ${cryptoSelected} en 24H: <span class="price">${porcent24h}%</span></p>
                <p class="info">Puedes comprar: <span class="price">${result.toFixed(4)} ${cryptoSelected}</span> unidades</p>`;
        } else  {
            coinInfo.innerHTML = `<p class="info">El precio del ${cryptoSelected} es de: <span class="price">${price}</span></p>
                <p class="info">El precio más alto es: <span class="price">${high24h}</span></p>
                <p class="info">El precio más bajo es: <span class="price">${low24h}</span></p>
                <p class="info">Variación del ${cryptoSelected} en 24H: <span class="price">${porcent24h}%</span></p>`;
        }

    } catch (error) {
        console.log(error);
    }        
})