async function countriesData() {
    let response = await fetch("http://127.0.0.1:8080/api/countryData.php");
    let ids = await response.json();
    return ids;
}
async function languageData() {
    let response = await fetch("http://127.0.0.1:8080/api/languagesData.php");
    let ids = await response.json();
    return ids;
}
async function citieData() {
    let response = await fetch("http://127.0.0.1:8080/api/cityData.php");
    let ids = await response.json();
    return ids;
}
async function fetchData() {
    let countries = await countriesData();
    let languagesDetail = await languageData();
    let cityData = await citieData();
    //sorting countries list.
    countries.sort((a, b) => a.CountryName.localeCompare(b.CountryName));
    //creating body.
    let body = document.querySelector("body");
    body.style.backgroundColor = "antiquewhite";
    body.style.padding = "20px";
    //title.
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
    const label = document.createElement("label");
    label.textContent = "Filter by Country:";
    label.style.display = "flex";
    countriesList.appendChild(label);
    let filterBox = document.createElement("INPUT");
    filterBox.setAttribute("type", "text");
    filterBox.style.display = "flex";
    filterBox.style.alignItems = "center";
    filterBox.style.justifyContent = "center";
    countriesList.append(filterBox);
    //create the list of countries
    let countriesBoxs = generateCountryList(countries);
    countriesList.appendChild(countriesBoxs);
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
    listItems.forEach(function (item) {
        item.addEventListener("mouseover", function () {
            this.style.cursor = "pointer";
        });
    });

    //event listener used to click on different country names.
    countriesList.addEventListener('click', event => {
        if (event.target.matches('.country')) {
            const selectedItem = event.target.textContent;
            let detailsBox = event.target;
            //create country details.
            let countryDetail = document.createElement("div");
            let countryInfo = generateCountryInfo(selectedItem, countries);
            countryDetail.id = "countryDetail";
            countryDetail.append(countryInfo);
            // create city list elements.
            let cityListTitle = document.createElement("h4");
            cityListTitle.textContent = `Cities in ${selectedItem}:`;
            let cityList = document.createElement("div");
            cityList.id = "cityList";
            let cities = listOfCities(selectedItem, countries);
            cityList.appendChild(cityListTitle);
            cityList.append(cities);

            detailsBox.appendChild(countryDetail);
            detailsBox.appendChild(cityList);

            cityList.addEventListener('click', event => {
                if (event.target.matches('#city')) {
                    const selectedItem = event.target.textContent;
                    console.log(selectedItem);
                    countryDetail.style.display = 'none';
                    let cityDetail = document.createElement("div");
                    let citiesBox = generateCityInfo(selectedItem);
                    cityDetail.append(citiesBox);
                    cityDetail.id = "cityDetail"
                    let oldCityDetail = detailsBox.querySelector("#cityDetail");
                    if (oldCityDetail) {
                        oldCityDetail.remove();
                    }
                    detailsBox.insertBefore(cityDetail, detailsBox.firstChild);
                }
            });
        }
    });

    //function used to create a list of country. 
    function generateCountryList(country) {
        let countriesList = document.createElement("div");
        for (let list of country) {
            let CountryBoxs = document.createElement("div");
            CountryBoxs.classList.add("country");
            CountryBoxs.style.display = "inline-block";
            CountryBoxs.style.backgroundColor = "lightblue";
            CountryBoxs.style.margin = "10px 10px ";
            CountryBoxs.style.padding = "20px";
            CountryBoxs.style.borderRadius = "20px 10px 10px 20px";
            CountryBoxs.textContent = list.CountryName;
            CountryBoxs.dataset.code = list.ISO;
            countriesList.appendChild(CountryBoxs);

        }
        return countriesList;
    }
    //function used to generate details in a country.
    function generateCountryInfo(selectedCountry, countries) {

        let detailsBox = document.createElement("div");

        for (let list of countries) {
            if (selectedCountry === list.CountryName) {
                let name = document.createElement("h2");
                name.textContent = `${selectedCountry}`;
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
                language.textContent = `language: ${languageRetriver(list.Languages, countries)}`;
                let neighbourCountries = document.createElement("h4");
                neighbourCountries.textContent = `Neighouring Countries: ${neighborRetriver(list.Neighbours, countries)} \n`;

                detailsBox.appendChild(name);
                detailsBox.appendChild(area);
                detailsBox.appendChild(population);
                detailsBox.appendChild(capitalName);
                detailsBox.appendChild(currency);
                detailsBox.appendChild(domain);
                detailsBox.appendChild(language);
                detailsBox.appendChild(description);
                detailsBox.appendChild(neighbourCountries);

            }
        }
        return detailsBox;
    }
    //function used to generate details on a city.
    function generateCityInfo(selectedCity) {

        let detailsBox = document.createElement("div");

        for (let list of cityData) {
            if (selectedCity === list.cityName) {
                let name = document.createElement("h2");
                name.textContent = `${selectedCity}`;
                name.style.textAlign = "center";
                let population = document.createElement("h4");
                population.textContent = `Population: ${list.population}`;
                let timeZone = document.createElement("h4");
                timeZone.textContent = `TimeZone: ${list.TimeZone}`;
                let Elevation = document.createElement("h4");
                Elevation.textContent = `Elevation: ${list.Elevation}`;
                detailsBox.appendChild(name);
                detailsBox.appendChild(timeZone);
                detailsBox.appendChild(population);
                detailsBox.appendChild(Elevation);
            }
        }
        return detailsBox;
    }

    //function used to display full language name. 
    function languageRetriver(language, countries) {
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
    function neighborRetriver(Neighbours, countries) {
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
    //function used to display the list of cities in a country.
    function listOfCities(countryName, countries) {
        let cityList = document.createElement("div");
        const list = [];


        const countryObj = countries.find(country => country.CountryName === countryName);
        const ISOCode = countryObj.ISO;

        for (let city of cityData) {
            if (ISOCode.includes(city.countryLocation)) {
                list.push(city.cityName);
            }
        }

        if (list.length === 0) {
            return `No cities found for country ISO code(s) ${countryName}`;
        }

        for (let city of list) {
            let cityName = document.createElement("div");
            cityName.textContent = city;
            cityName.id = "city";
            cityName.style.display = "inline-block";
            cityName.style.backgroundColor = "aqua";
            cityName.style.margin = "10px 10px ";
            cityName.style.padding = "20px";
            cityName.style.borderRadius = "20px 10px 10px 20px";
            cityList.appendChild(cityName);
        }
        return cityList;
    }
}

fetchData();



