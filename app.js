const API_KEY = "your API key";

const LOCATION_INPUT = document.getElementById("location-value");
const SUBMIT_BUTTON = document.getElementById("location-submit");

const container = document.getElementById("container");

const containerHeader = document.createElement("div");
containerHeader.setAttribute("id", "container-header");

const containerBody = document.createElement("div");
containerBody.setAttribute("id", "container-body");

SUBMIT_BUTTON.addEventListener("click", () => {
    const LOCATION = LOCATION_INPUT.value.trim();

    if (LOCATION) {
        clearContainer();
        function requestLocationWeather(API_KEY, LOCATION){
            return Promise.resolve(
                fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${LOCATION}&aqi=yes`)
            );
        }
    }
    requestLocationWeather(API_KEY, LOCATION)
        .then(reponse => reponse.json())
        .then(data => {
            function createAndSetElement(elementType, className, textContent) {
                const element = document.createElement(elementType);
                element.classList.add(className);
                element.textContent = textContent;
                return element;
            }

            const headerLocationName = createAndSetElement("div", "header-location-name", data.location.name);
            const headerLocationCountry = createAndSetElement("div", "header-location-country", data.location.country);
            const headerCurrentTempCelsius = createAndSetElement("div", "header-current-temp-celsius", data.current.temp_c);
            const headerCurrentCondition = createAndSetElement("div", "header-current-condition", data.current.condition.text);

            containerHeader.append(
                headerLocationName,
                headerLocationCountry,
                headerCurrentTempCelsius,
                headerCurrentCondition
            );

            const bodyElements = [
                { className: "body-current-uv", textContent: `UV ${data.current.uv}` },
                { className: "body-current-wind-kph", textContent: `Wind KPH ${data.current.wind_kph}` },
                { className: "body-current-wind-direction", textContent: `Wind Direction ${data.current.wind_dir}` },
                { className: "body-current-precipitation-milimeter", textContent: `Precipitation ${data.current.precip_mm} mm` },
                { className: "body-current-humidity", textContent: `Humidity ${data.current.humidity}` },
                { className: "body-current-is-day", textContent: data.current.is_day === 1 ? "Day" : "Night" },
                { className: "body-current-visibility", textContent: `Visibility ${data.current.vis_km} kms` },
                { className: "body-current-pressure", textContent: `Pressure ${data.current.pressure_mb} hPa` }
            ];

            bodyElements.forEach(elementData => {
                const element = createAndSetElement("div", elementData.className, elementData.textContent);
                containerBody.appendChild(element);
            });

            container.append(containerHeader, containerBody);
        });
    LOCATION_INPUT.value = "";
})
function clearContainer(){
    while(containerHeader.firstChild){
        containerHeader.firstChild.remove();
    }
    while(containerBody.firstChild){
        containerBody.firstChild.remove();
    }
}