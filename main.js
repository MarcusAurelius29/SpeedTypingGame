const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteDisplayInput = document.getElementById("quoteInput");

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

quoteDisplayInput.addEventListener('input' , () => {
    console.log("Changed");
    const arrayQuote = quoteDisplayElement.querySelectorAll("span");
    const arrayValue = quoteDisplayInput.value.split('');
    arrayQuote.forEach((characterSpan , index) => {
         const character = arrayValue[index];

         if(character == null)
         {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
         }
         else if(character === characterSpan.innerText)
         {
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
         }
         else{
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");
         }
    })
})

async function renderNewQuote() {
    const quote = await getRandomQuote();
    console.log(quote);
    quoteDisplayElement.innerHTML = '';

    quote.split('').forEach(character => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    })

    quoteDisplayInput.value = null;
}

renderNewQuote();