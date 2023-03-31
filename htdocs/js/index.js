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
async function picData() {
    let response = await fetch("http://127.0.0.1:8080/api/imageData.php");
    let ids = await response.json();
    return ids;
}
async function fetchData() {
    let countries = await countriesData();
    let languagesDetail = await languageData();
    let cityData = await citieData();
    let imageData = await picData();
    //sorting countries list.
    countries.sort((a, b) => a.CountryName.localeCompare(b.CountryName));
    //local storage.
    let countryNames = countries.map(country => country.CountryName);
    let countryISOs = countries.map(country => country.ISO);
    let cityName = cityData.map(city => city.cityName);
    localStorage.setItem("countriesNames", JSON.stringify(countryNames));
    localStorage.setItem("countriesISO", JSON.stringify(countryISOs));
    localStorage.setItem("cityNames", JSON.stringify(cityName));
    //creating body.
    let body = document.querySelector("body");
    body.style.backgroundColor = "antiquewhite";
    body.style.padding = "20px";
    //title.
    let title = document.createElement("h1");
    title.textContent = "The Default View";
    title.style.textAlign = "center";
    body.append(title);
    //main div
    let countriesList = document.createElement("div");
    countriesList.id = "CountriesListing";
    //country title
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
    let countriesNames = JSON.parse(localStorage.getItem("countriesNames"));
    let countriesISO = JSON.parse(localStorage.getItem("countriesISO"));
    let countriesBoxs = generateCountryList(countriesNames, countriesISO);
    countriesList.appendChild(countriesBoxs);
    body.append(countriesList);
    let listItems = document.querySelectorAll('.country');
    // erase non searched countries. 
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
    //mouse pointer 
    listItems.forEach(function (item) {
        item.addEventListener("mouseover", function () {
            this.style.cursor = "pointer";
        });
    });
    //event listener used to click on different country names.
    countriesList.addEventListener('click', event => {
        if (event.target.matches('.country')) {
            const selectedItem = event.target.textContent;
            let countryBox = event.target;
            let detailsBox = document.createElement("div");
            detailsBox.id = "detailsBox";
            //erase old detail if there is any
            let oldDetail = countriesList.querySelector("#detailsBox");
            if (oldDetail) {
                oldDetail.remove();
            }

            countryBox.appendChild(detailsBox);

            //create country details.
            let countryDetail = document.createElement("div");
            //use method
            let countryInfo = generateCountryInfo(selectedItem, countries);
            countryDetail.id = "countryDetail";
            countryDetail.append(countryInfo);
            //create img lists
            let imageBox = document.createElement("div");
            //use method 
            let imagelists = generateImage(selectedItem, "");

            imageBox.id = "imageBox";
            imageBox.append(imagelists);
            //create city list elements.
            let cityListTitle = document.createElement("h4");
            cityListTitle.textContent = `Cities in ${selectedItem}:`;
            let cityList = document.createElement("div");
            cityList.id = "cityList";
            //use method
            let cities = listOfCities(selectedItem, countries);
            cityList.appendChild(cityListTitle);
            cityList.append(cities);
            //adding lists.
            detailsBox.appendChild(countryDetail);
            detailsBox.appendChild(imageBox);
            detailsBox.appendChild(cityList);

            //event handler within the event handler that handles city clicking
            cityList.addEventListener('click', event => {
                if (event.target.matches('.city')) {
                    const selectedItem = event.target.textContent;

                    let cityDetail = document.createElement("div");
                    cityDetail.id = "cityDetail"
                    //use method
                    let citiesBox = generateCityInfo(selectedItem);
                    //insert before the lists.
                    cityDetail.append(citiesBox);
                    //erase old city detail
                    let oldDetail = detailsBox.querySelector("#cityDetail");
                    if (oldDetail) {
                        detailsBox.replaceChild(cityDetail, oldDetail);
                    }
                    else {

                        detailsBox.replaceChild(cityDetail, countryDetail);
                    }
                    //filter city images
                    let cityImages = generateImage("", selectedItem);
                    //erase old images
                    imageBox.replaceChild(cityImages, imageBox.firstChild);

                }
            });
            imageBox.addEventListener('click', event => {
                const selectedItem = event.currentTarget.querySelector('.image');
                if (selectedItem) {
                    title.textContent = "The Single Photo View";
                    countriesList.style.display = "none";

                    console.log(selectedItem);

                    let singleImageBox = singlePhotoDisplay(selectedItem);
                    let returnButton = document.createElement("button");
                    returnButton.textContent = "Return";

                    body.appendChild(returnButton);
                    body.appendChild(singleImageBox);

                    returnButton.addEventListener('click', event => {
                        countriesList.style.display = "block";
                        singleImageBox.remove();
                        returnButton.remove();
                    });
                }
            });

        }
    });

    //function used to create a list of country. 
    function generateCountryList(countriesNames, countriesISO) {

        let countriesList = document.createElement("div");
        for (let i = 0; i < countriesISO.length; i++) {
            let CountryBoxs = document.createElement("div");
            CountryBoxs.classList.add("country");
            CountryBoxs.style.display = "inline-block";
            CountryBoxs.style.backgroundColor = "lightblue";
            CountryBoxs.style.margin = "10px 10px ";
            CountryBoxs.style.padding = "20px";
            CountryBoxs.style.borderRadius = "20px 10px 10px 20px";
            CountryBoxs.textContent = countriesNames[i];
            CountryBoxs.dataset.code = countriesISO[i];
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
            return `No cities found for ${countryName}`;
        }

        for (let city of list) {
            let cityName = document.createElement("div");
            cityName.classList.add("city");
            cityName.textContent = city;
            cityName.style.display = "inline-block";
            cityName.style.backgroundColor = "aqua";
            cityName.style.margin = "10px 10px ";
            cityName.style.padding = "20px";
            cityName.style.borderRadius = "20px 10px 10px 20px";
            cityList.appendChild(cityName);
        }
        return cityList;
    }
    //functions used to generate images.
    function generateCountryImage() {

    }

    function generateImage(country, city) {

        const displayBox = document.createElement("div");
        if (city) {
            for (let list of imageData) {
                if (city === list.city_name) {
                    let imageBox = document.createElement("div");
                    imageBox.classList.add("image");
                    let img = document.createElement("img");
                    img.src = `https://res.cloudinary.com/dvp4chsmz/image/upload//c_scale,h_200,w_160/v1676498190/3512-2023-01-project-images/${list.image_path}`;
                    img.style.display = "inline-block";
                    img.style.margin = "10px 10px ";
                    img.style.padding = "20px";
                    img.style.borderRadius = "20px 20px 20px 20px";
                    imageBox.append(img);
                    imageBox.dataset.code = list.image_path;
                    imageBox.style.display = "inline-block";
                    displayBox.appendChild(imageBox);
                }

            }
        }
        else {
            for (let list of imageData) {
                if (country === list.country_name) {
                    let imageBox = document.createElement("div");
                    imageBox.classList.add("image");
                    let img = document.createElement("img");
                    img.src = `https://res.cloudinary.com/dvp4chsmz/image/upload//c_scale,h_200,w_160/v1676498190/3512-2023-01-project-images/${list.image_path}`;
                    img.style.display = "inline-block";
                    img.style.margin = "10px 10px ";
                    img.style.padding = "20px";
                    img.style.borderRadius = "20px 20px 20px 20px";
                    imageBox.append(img);
                    imageBox.dataset.code = list.image_path;
                    imageBox.style.display = "inline-block";
                    displayBox.appendChild(imageBox);

                }

            }
        }
        if (displayBox.childElementCount === 0) {
            displayBox.textContent = "No photo Taken at this Location."
        }
        return displayBox;
    }
    //method for singlePhotoDisplay 
    function singlePhotoDisplay(imageClicked) {
        let imagePath = imageClicked.dataset.code;
        let img = document.createElement("img");
        img.src = `https://res.cloudinary.com/dvp4chsmz/image/upload//c_scale,h_600,w_600/v1676498190/3512-2023-01-project-images/${imagePath}`;
        let imageBox = document.createElement("div");

        for (let list of imageData) {
            if (list.image_path === imagePath) {

                let title = document.createElement("h1");
                title.textContent = list.title;
                let lat = document.createElement("h4");
                lat.textContent = `latitude: ${list.image_latitude}`
                let long = document.createElement("h4");
                long.textContent = `longitude: ${list.image_longitude}`;
                let country = document.createElement("h4");
                country.textContent = `country: ${list.country_name}`;
                let city = document.createElement("h4");
                city.textContent = `city: ${list.city_name}`;
                let description = document.createElement("p");
                description.textContent = list.description;
                let userName = document.createElement("h4");
                userName.textContent = `Username: ${list.firstName}, ${list.lastName}`;
                imageBox.appendChild(title);
                imageBox.appendChild(userName);
                imageBox.appendChild(lat);
                imageBox.appendChild(long);
                imageBox.appendChild(img);
                imageBox.appendChild(description);
                imageBox.appendChild(country);
                imageBox.appendChild(city);
                imageBox.style.backgroundColor = "lightblue"
                imageBox.style.margin = "10px 10px ";
                imageBox.style.padding = "20px";
                imageBox.style.borderRadius = "20px 20px 20px 20px";

            }
        }


        return imageBox;

    }
}

fetchData();



