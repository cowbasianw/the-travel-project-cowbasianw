import { countries } from "./data/data.js";

let body = document.querySelector("body");

let title = document.createElement("h1");
title.textContent = "The Default View";
title.style.textAlign = "center";
body.append(title);

let countriesList = document.createElement("div");
countriesList.id = "CountriesListing";

let countryListingTitle = document.createElement("h2");
countryListingTitle.textContent = "Country Listing";
countryListingTitle.style.textAlign = "center";
countriesList.append(countryListingTitle);

let filterBox = document.createElement("INPUT");
filterBox.setAttribute("type", "text");

filterBox.style.display = "flex";
filterBox.style.align = "center";
countriesList.append(filterBox);

for (let list of countries) {
    let CountryBoxs = document.createElement("div");
    CountryBoxs.classList.add("country");
    CountryBoxs.style.display = "inline-block";
    CountryBoxs.style.margin = "10px 10px ";
    CountryBoxs.textContent = list.CountryName;
    CountryBoxs.dataset.code = list.ISO;
    countriesList.appendChild(CountryBoxs);
}

body.append(countriesList);

let listItems = document.querySelectorAll('.country');

filterBox.addEventListener('input', () => {
    const filterTerm = filterBox.value.toLowerCase();

    listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.startsWith(filterTerm)) {
            item.style.display = 'inline-block';
        } else {
            item.style.display = 'none';
        }
    });
});



