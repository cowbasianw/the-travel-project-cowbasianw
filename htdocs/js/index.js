import { countries } from "./data/countryData.js";

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

function languageRetriver(code) {

}

function neighborRetriver(Neighbours) {
    const listOfNeughbours = Neighbours.split(',');
    const namesOfNeighbours = [];

    for (let isoCode of listOfNeughbours) {
        const countryObj = countries.find(country => country.ISO === isoCode);
        if (countryObj) {
            namesOfNeighbours.push(countryObj.CountryName);
        }
    }
    const countryString = namesOfNeighbours.join(', ');
    return countryString;
}

countriesList.addEventListener('click', event => {
    if (event.target.matches('.country')) {
        const selectedItem = event.target.textContent;
        for (let list of countries) {
            if (selectedItem === list.CountryName) {
                let detailsBox = document.createElement("div");
                detailsBox.id = "detailsBox";
                let name = document.createElement("h2");
                name.textContent = `${selectedItem}`;
                name.style.textAlign = "center";
                let area = document.createElement("h4");
                area.textContent = `Area: ${list.Area}`;
                let population = document.createElement("h4");
                population.textContent = `Population: ${list.Population}`;
                let capitalName = document.createElement("h4");
                capitalName.textContent = `Capital Name: ${list.Capital} \n`;
                let currency = document.createElement("h4");
                currency.textContent = `Currency: ${list.CurrencyName} \n`;
                let domain = document.createElement("h4");
                domain.textContent = `domain: ${list.TopLevelDomain} \n`;
                let description = document.createElement("h4");
                description.textContent = `description: ${list.CountryDescription} \n`;
                let language = document.createElement("h4");
                language.textContent = `language: ${list.Languages}`;

                detailsBox.appendChild(name);
                detailsBox.appendChild(area);
                detailsBox.appendChild(population);
                detailsBox.appendChild(capitalName);
                detailsBox.appendChild(currency);
                detailsBox.appendChild(domain);
                detailsBox.appendChild(language);
                detailsBox.appendChild(description);

                countriesList.style.display = 'none';
                body.append(detailsBox);
            }
        }
    }
});


