" use strict";

const countryContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");

const renderCountry = function (data, className = "") {
  const html = ` 
    <article class="country ${className}">
    <img class="country__img" src="${Object.values(data.flags)[1]}" alt="">
        <div class="country__data">
            <h3 class="country__name">${data.name.official}</h3>
            <h4 class="country__region">${data.continents}</h4>
            <p class="country__row"><span>👩‍👧‍👧</span>${(
              +data.population / 1000000
            ).toFixed(1)}M</p>
            <p class="country__row"><span>🗣</span>${Object.values(
              data.languages
            )}</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
        </div>        
    
    </article> 
   
    `;
  countryContainer.insertAdjacentHTML("beforeend", html);
  countryContainer.style.opacity = 1;
};

const fetchCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    //render country 1
    renderCountry(data);

    // Get country neighbour
    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    const req2 = new XMLHttpRequest();
    req2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    req2.send();

    req2.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      // console.log(data);

      // render neighbour
      renderCountry(data, "neighbour");
    });
    //get another neighbour
    const neighbour2 = data.borders?.[1];
    if (!neighbour2) return;

    const req3 = new XMLHttpRequest();
    req3.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour2}`);
    req3.send();

    req3.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      // console.log(data);
      renderCountry(data, "neighbour");
    });

    //get another neighbour
    const neighbour3 = data.borders?.[2];
    if (!neighbour3) return;

    const req4 = new XMLHttpRequest();
    req4.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour3}`);
    req4.send();

    req4.addEventListener("load", function () {
      const [data] = JSON.parse(this.responseText);
      // console.log(data);
      renderCountry(data, "neighbour");
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const displayCountry = async function (country) {
  await fetchCountry(country);
  await wait(5);
  countryContainer.innerHTML = " ";
  // await wait(1);
};

const fetchAllCountries = async () => {
  const countries = [
    "Nigeria", "spain", "uk", "south africa", "Egypt",
    "India", "colombia", "Namibia", "Paraguay", "Russia",
    "Singapore", "china", "Brazil", "Uganda", "Malaysia",
    "Gambia", "France", "Latvia", "Germany","Portugal",
    "Italy", "comoros", "chile", "vietnam", "croatia",
    "hungary", "Belarus", "Burundi", "Australia", "North Korea",
    "Argentina", "Cameroon", "Ghana", "Finland", "Denmark",
    "saudi arabia", "portugal", "sweden", "peru","Bangladesh",
    "estonia", "ireland", "usa", "Netherland", "Thailand",
    "Senegal", "south korea", "Romania", "austria","Bolivia",
  ];
  for await (const country of countries) {
    await displayCountry(country);
  }
  fetchAllCountries();
};

fetchAllCountries();
