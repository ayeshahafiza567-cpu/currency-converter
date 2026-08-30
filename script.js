// Currency information

const currencies = {
  USD: {
    name: "US Dollar",
    countryCode: "us"
  },

  PKR: {
    name: "Pakistani Rupee",
    countryCode: "pk"
  },

  EUR: {
    name: "Euro",
    countryCode: "eu"
  },

  GBP: {
    name: "British Pound",
    countryCode: "gb"
  },

  AED: {
    name: "UAE Dirham",
    countryCode: "ae"
  },

  SAR: {
    name: "Saudi Riyal",
    countryCode: "sa"
  },

  INR: {
    name: "Indian Rupee",
    countryCode: "in"
  },

  CAD: {
    name: "Canadian Dollar",
    countryCode: "ca"
  },

  AUD: {
    name: "Australian Dollar",
    countryCode: "au"
  },

  JPY: {
    name: "Japanese Yen",
    countryCode: "jp"
  },

  CNY: {
    name: "Chinese Yuan",
    countryCode: "cn"
  },

  TRY: {
    name: "Turkish Lira",
    countryCode: "tr"
  },

  NGN: {
    name: "Nigerian Naira",
    countryCode: "ng"
  }
};


// Exchange rates
// Har value ka matlab hai:
// 1 USD ke badlay kitni currency milti hai

const exchangeRates = {
  USD: 1,
  PKR: 278.50,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  SAR: 3.75,
  INR: 83.40,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 151.50,
  CNY: 7.24,
  TRY: 32.30,
  NGN: 1450
};


// HTML elements

const converterForm =
  document.getElementById("converterForm");

const amountInput =
  document.getElementById("amount");

const fromCurrency =
  document.getElementById("fromCurrency");

const toCurrency =
  document.getElementById("toCurrency");

const fromFlag =
  document.getElementById("fromFlag");

const toFlag =
  document.getElementById("toFlag");

const result =
  document.getElementById("result");

const errorMessage =
  document.getElementById("errorMessage");

const swapButton =
  document.getElementById("swapButton");




function addCurrencyOptions() {

  for (let currencyCode in currencies) {

   

    const fromOption =
      document.createElement("option");

    fromOption.value = currencyCode;

    fromOption.textContent = currencyCode;

    fromOption.title =
      currencies[currencyCode].name;

    fromCurrency.appendChild(fromOption);


    // To option

    const toOption =
      document.createElement("option");

    toOption.value = currencyCode;

    toOption.textContent = currencyCode;

    toOption.title =
      currencies[currencyCode].name;

    toCurrency.appendChild(toOption);
  }


 

  fromCurrency.value = "USD";

  toCurrency.value = "PKR";
}




function updateFlags() {

  const selectedFrom =
    fromCurrency.value;

  const selectedTo =
    toCurrency.value;


  const fromCountryCode =
    currencies[selectedFrom].countryCode;

  const toCountryCode =
    currencies[selectedTo].countryCode;


  // From flag

  fromFlag.src =
    `https://flagcdn.com/w40/${fromCountryCode}.png`;

  fromFlag.alt =
    `${selectedFrom} Flag`;


  // To flag

  toFlag.src =
    `https://flagcdn.com/w40/${toCountryCode}.png`;

  toFlag.alt =
    `${selectedTo} Flag`;
}




function formatNumber(number) {

  return new Intl.NumberFormat("en-US", {

    minimumFractionDigits: 2,

    maximumFractionDigits: 2

  }).format(number);
}




function convertCurrency(event) {

  if (event) {
    event.preventDefault();
  }


  const amount =
    Number(amountInput.value);

  const from =
    fromCurrency.value;

  const to =
    toCurrency.value;


  

  if (isNaN(amount) || amount <= 0) {

    result.textContent =
      "Please enter a valid amount.";

    errorMessage.textContent =
      "Amount must be greater than zero.";

    amountInput.focus();

    return;
  }


  errorMessage.textContent = "";


  

  const amountInUSD =
    amount / exchangeRates[from];


 

  const convertedAmount =
    amountInUSD * exchangeRates[to];


  // Final result

  result.textContent =
    `${formatNumber(amount)} ${from} = ` +
    `${formatNumber(convertedAmount)} ${to}`;
}




fromCurrency.addEventListener(
  "change",
  function () {

    updateFlags();

    convertCurrency();
  }
);




toCurrency.addEventListener(
  "change",
  function () {

    updateFlags();

    convertCurrency();
  }
);


// Swap currency button

swapButton.addEventListener(
  "click",
  function () {

    const oldFromCurrency =
      fromCurrency.value;


    fromCurrency.value =
      toCurrency.value;

    toCurrency.value =
      oldFromCurrency;


    updateFlags();

    convertCurrency();
  }
);




converterForm.addEventListener(
  "submit",
  convertCurrency
);




addCurrencyOptions();

updateFlags();

convertCurrency();