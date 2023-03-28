import { countries } from "./data/countryData.js";
import { languagesDetail } from "./data/languageData.js";
import { cityData } from "./data/cityData.js";


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
//search function
let filterBox = document.createElement("INPUT");
filterBox.setAttribute("type", "text");
filterBox.style.display = "flex";
filterBox.style.align = "center";
countriesList.append(filterBox);
//create the list of countries
for (let list of countries) {
    let CountryBoxs = document.createElement("div");
    CountryBoxs.classList.add("country");
    CountryBoxs.style.display = "inline-block";
    CountryBoxs.style.backgroundColor = "lightblue";
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
//function used to display full language name. 
function languageRetriver(language) {
    if (language === null) {
        return "No language Information avaliable."
    }
    else {
        const listOfLanguages = language.split(',');
        const fullNamesOfLanguages = [];
        for (let langCode of listOfLanguages) {
            const [hyphen, region] = langCode.split('-');

            for (let dataList of languagesDetail) {

                if (dataList.languagesCode === hyphen) {
                    const fullName = dataList.languagesName;
                    if (region) {
                        for (let countryInfo of countries) {
                            if (region === countryInfo.ISO) {
                                const regionalFullName = countryInfo.CountryName;
                                const fullCode = `${fullName} (${regionalFullName})`;
                                fullNamesOfLanguages.push(fullCode);
                            }
                        }
                    } else {
                        fullNamesOfLanguages.push(fullName);
                    }
                }
            }
        }
        const languagesString = fullNamesOfLanguages.join(', ');
        return languagesString;
    }
}
//function used to idsplay full neighbor countries.
function neighborRetriver(Neighbours) {
    if (Neighbours === null) {
        return "There are no neighbouring Countries."
    }
    else {
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
}
function listOfCities(countryISO) {
    let cityList = document.createElement("div");
    const list = [];

    for (let cList of cityData) {
        if (cList.countryLocation === countryISO) {
            list.push(cList.cityName);
        }
        else {
            return "No pictures taken in this any city of this country.";
        }
    }

    for (let city of list) {
        let cityName = document.createElement("p");
        cityName.textContent = city;
        cityList.appendChild(cityName);
        cityList.style.display = "inline-block";
    }

    return cityList;
}
countriesList.addEventListener('click', event => {
    if (event.target.matches('.country')) {
        const selectedItem = event.target.textContent;
        let detailsBox = event.target;
        for (let list of countries) {
            if (selectedItem === list.CountryName) {
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
                language.textContent = `language: ${languageRetriver(list.Languages)}`;
                let neighbourCountries = document.createElement("h4");
                neighbourCountries.textContent = `Neighouring Countries: ${neighborRetriver(list.Neighbours)} \n`;
                // create city list elements
                let cityListTitle = document.createElement("h4");
                cityListTitle.textContent = `Cities in ${list.CountryName}:`;
                let cityList = document.createElement("div");
                cityList.id = "cityList";
                let cities = listOfCities(list.ISO);
                cityList.appendChild(cityListTitle);
                cityList.append(cities);
                cityList.id = "cityList";
                console.log(cityList);
                console.log(list.ISO);

                detailsBox.appendChild(name);
                detailsBox.appendChild(area);
                detailsBox.appendChild(population);
                detailsBox.appendChild(capitalName);
                detailsBox.appendChild(currency);
                detailsBox.appendChild(domain);
                detailsBox.appendChild(language);
                detailsBox.appendChild(description);
                detailsBox.appendChild(neighbourCountries);
                detailsBox.appendChild(cityList);
            }
        }
    }
});


