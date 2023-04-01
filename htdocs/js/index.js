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
    let imagePaths = imageData.map(img => img.image_path);
    localStorage.setItem("imagePaths", JSON.stringify(imagePaths));
    localStorage.setItem("countriesNames", JSON.stringify(countryNames));
    localStorage.setItem("countriesISO", JSON.stringify(countryISOs));
    localStorage.setItem("cityNames", JSON.stringify(cityName));
    localStorage.setItem("languagesDetails", JSON.stringify(languagesDetail));
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
    //search/filter function
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "Countries That contains images");
    checkbox.setAttribute("value", "true");
    const labelforSearch = document.createElement("label");
    const labelforBox = document.createElement("label");
    labelforSearch.textContent = "Filter by Country:";
    labelforSearch.style.display = "flex";
    labelforBox.textContent = "Countries That contains images";
    labelforBox.style.display = "flex";
    countriesList.appendChild(labelforSearch);
    let filterBox = document.createElement("INPUT");
    filterBox.setAttribute("type", "text");
    filterBox.style.display = "block";
    filterBox.style.alignItems = "center";
    filterBox.style.justifyContent = "center";
    countriesList.append(filterBox);
    countriesList.appendChild(labelforBox);
    countriesList.appendChild(checkbox);
    //create the list of countries
    let countriesNames = JSON.parse(localStorage.getItem("countriesNames"));
    let countriesISO = JSON.parse(localStorage.getItem("countriesISO"));
    let countriesBoxs = generateCountryList(countriesNames, countriesISO);
    countriesList.appendChild(countriesBoxs);
    body.append(countriesList);
    let listItems = document.querySelectorAll('.country');
    // erase non searched countries, checks if the checkbox is checked inside the filterBox event listener.
    filterBox.addEventListener('input', () => {
        const filterTerm = filterBox.value.toLowerCase();
        listItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.startsWith(filterTerm)) {
                if (checkbox.checked) {
                    const imageCountry = imageData.some(imagelist => imagelist.country_name.toLowerCase() === text);
                    if (imageCountry) {
                        item.style.display = 'inline-block';
                        console.log(filterBox.value.toLowerCase());
                    } else {
                        item.style.display = 'none';
                    }
                } else {
                    item.style.display = 'inline-block';
                }
            } else {
                item.style.display = 'none';
            }
        });
    });
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            listItems.forEach(item => {
                const text = item.textContent;
                if (imageData.some(image => image.country_name === text)) {
                    if (filterBox.value === '' || item.textContent.toLowerCase().startsWith(filterBox.value.toLowerCase())) {
                        item.style.display = 'inline-block';
                        console.log(filterBox.value.toLowerCase());
                    } else {
                        item.style.display = 'none';
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        } else {
            listItems.forEach(item => {
                if (filterBox.value === '' || item.textContent.toLowerCase().startsWith(filterBox.value.toLowerCase())) {
                    item.style.display = 'inline-block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
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

            let imagelists = generateImage(selectedItem);

            imageBox.id = "imageBox";
            imageBox.append(imagelists);
            //create city list elements.
            let cityListTitle = document.createElement("h4");
            cityListTitle.textContent = `Cities in ${selectedItem}:`;
            let cityList = document.createElement("div");
            cityList.id = "cityList";
            //use method
            let cityName = JSON.parse(localStorage.getItem("cityName"));
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
                    let cityImages = generateImage(selectedItem);
                    //erase old images
                    imageBox.replaceChild(cityImages, imageBox.firstChild);

                }
            });
            // event handler for the image box clicking
            imageBox.addEventListener('click', event => {

                if (event.target.matches('img')) {
                    const selectedItem = event.target.parentNode;
                    title.textContent = "The Single Photo View";
                    countriesList.style.display = "none";

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
        let languagesDetails = JSON.parse(localStorage.getItem("languagesDetails"));
        if (language === null) {
            return "No language Information avaliable."
        }
        else {
            const listOfLanguages = language.split(',');
            const fullNamesOfLanguages = [];
            for (let langCode of listOfLanguages) {
                const [hyphen, region] = langCode.split('-');
                for (let dataList of languagesDetails) {
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
        let sortedCityList = cityData.sort((a, b) => a.cityName.localeCompare(b.cityName));
        for (let city of sortedCityList) {
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
    //function used to adjust the big pic 
    function adjustOneImageSize(image) {
        console.log('Adjusting the single view image sizes...');
        if (image.dataset.code) {
            let imagePath = image.dataset.code;
            let oldImages = image.querySelector('img');
            let height = 600;
            let weight = 600;
            if (window.innerWidth < 376) {
                height = 280;
                weight = 260;
            } else if (window.innerWidth < 768) {
                height = 480;
                weight = 460;
            } else if (window.innerWidth < 992) {
                height = 600;
                weight = 600;
            } else if (window.innerWidth < 1200) {
                height = 860;
                weight = 840;
            }
            let adjustedImg = document.createElement("img");
            adjustedImg.src = `https://res.cloudinary.com/dvp4chsmz/image/upload//c_scale,h_${height},w_${weight}/v1676498190/3512-2023-01-project-images/${imagePath}`;
            image.replaceChild(adjustedImg, oldImages); // Replace existing images with updated ones
        }
    }
    //functions used to adjust images.
    function adjustImageSizes(images) {
        console.log('Adjusting the list of images sizes...');
        for (let img of images) {
            if (img.dataset.code) {
                let imagePath = img.dataset.code;
                let oldImages = img.querySelector('img');
                let height = 160;
                let weight = 120;
                if (window.innerWidth < 376) {
                    height = 80;
                    weight = 60;
                } else if (window.innerWidth < 768) {
                    height = 120;
                    weight = 100;
                } else if (window.innerWidth < 992) {
                    height = 140;
                    weight = 100;
                } else if (window.innerWidth < 1200) {
                    height = 160;
                    weight = 120;
                }
                let adjustedImg = document.createElement("img");
                adjustedImg.src = `https://res.cloudinary.com/dvp4chsmz/image/upload//c_scale,h_${height},w_${weight}/v1676498190/3512-2023-01-project-images/${imagePath}`;
                img.replaceChild(adjustedImg, oldImages); // Replace existing images with updated ones
            }
        }


    }

    window.addEventListener('resize', function () {
        let images = document.querySelectorAll('.image');
        let theImage = document.querySelector('#singleViewBox');
        adjustImageSizes(images);
        adjustOneImageSize(theImage);
    });

    function generateImage(selectedItem) {

        const displayBox = document.createElement("div");
        const displayedImages = []; // array to store image paths that have already been displayed

        for (let list of imageData) {
            if ((selectedItem === list.country_name || selectedItem === list.city_name) && !displayedImages.includes(list.image_path)) {
                let imageBox = document.createElement("div");
                imageBox.classList.add("image");
                let img = document.createElement("img");
                img.src = `https://res.cloudinary.com/dvp4chsmz/image/upload//c_scale,h_200,w_160/v1676498190/3512-2023-01-project-images/${list.image_path}`;
                img.style.display = "inline-block";
                img.style.margin = "10px 10px ";
                img.style.padding = "20px";
                img.style.borderRadius = "20px 20px 20px 20px";
                imageBox.appendChild(img);
                imageBox.dataset.code = list.image_path;
                imageBox.style.display = "inline-block";

                displayedImages.push(list.image_path); // add image path to displayed images
                //create overley
                let overlay = document.createElement("div");
                overlay.classList.add("overlay");
                let numOfRating3 = 0;
                for (let item of imageData) {
                    if (item.image_path === imageBox.dataset.code) {
                        numOfRating3++;
                    }
                }
                overlay.textContent = `Numbers of Ratings 3: ${numOfRating3}`;

                imageBox.appendChild(overlay);
                displayBox.appendChild(imageBox);
            }
        }
        let images = document.querySelectorAll('.image');
        adjustImageSizes(images);
        if (displayBox.childElementCount === 0) {
            displayBox.textContent = "No photo Taken at this Location."
        } else {
            const overlays = displayBox.querySelectorAll(".overlay");
            overlays.forEach(overlay => {
                // add CSS styles to the overlay element

                overlay.style.bottom = "0";
                overlay.style.left = "0";

                overlay.style.background = "rgba(0, 0, 0, 0.6)";
                overlay.style.color = "#fff";
                overlay.style.padding = "10px";
                overlay.style.fontSize = "14px";
            });
        }
        return displayBox;
    }
    //method for singlePhotoDisplay 
    function singlePhotoDisplay(imageClicked) {
        let imagePath = imageClicked.dataset.code;
        let img = document.createElement("img");
        img.src = `https://res.cloudinary.com/dvp4chsmz/image/upload//c_scale,h_600,w_600/v1676498190/3512-2023-01-project-images/${imagePath}`;
        let imageBox = document.createElement("div");
        imageBox.dataset.code = imagePath;
        imageBox.id = 'singleViewBox';
        let title = document.createElement("h1");
        let lat = document.createElement("h4");
        let long = document.createElement("h4");
        let country = document.createElement("h4");
        let city = document.createElement("h4");
        let description = document.createElement("p");
        const userName = [];
        const ratings = [];
        let userNameElement = document.createElement("h4");


        for (let list of imageData) {
            if (list.image_path === imagePath) {
                title.textContent = list.title;
                lat.textContent = `latitude: ${list.image_latitude}`
                long.textContent = `longitude: ${list.image_longitude}`;
                country.textContent = `country: ${list.country_name}`;
                city.textContent = `city: ${list.city_name}`;
                description.textContent = list.description;
                ratings.push(list.rating);
                userName.push(` Image Rating: ${list.rating}, Rated By User: ${list.firstName} ${list.lastName} `);

            }

            userName.sort((a, b) => {
                const ratingA = parseInt(a.match(/Image Rating: (\d+)/)[1]);
                const ratingB = parseInt(b.match(/Image Rating: (\d+)/)[1]);
                return ratingB - ratingA;
            });

            userNameElement.textContent = `Rating list: ${userName}`;
            imageBox.appendChild(title);
            imageBox.appendChild(userNameElement);
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
        adjustOneImageSize(imageBox);
        return imageBox;
    }
}
fetchData();



