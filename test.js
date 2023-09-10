
        const placesData = [
          {
            long: 83.475335,
            lat: 21.615259,
            place: "Baigapali",
          },
          {
            long: 86.740137,
            lat: 21.924559,
            place: "Baripada",
          },
          {
            long: 84.114222,
            lat: 20.806212,
            place: "Ainlapali",
          },
          {
            long: 85.784739,
            lat: 20.889088,
            place: "AsuraBandha Patana",
          },
          {
            long: 86.868320,
            lat: 20.770679,
            place: "Subarnpur",
          },
          {
            long: 85.797152,
            lat: 19.818253,
            place: "Puri",
          },
          {
            long: 84.766824,
            lat: 19.089211,
            place: "Pata Sonapur",
          },
          {
            long: 83.434954,
            lat: 19.028637,
            place: "Sana Raisingi",
          },
          {
            long: 81.399363,
            lat: 17.832857,
            place: "Motu",
          },
          {
            long: 82.250857,
            lat: 18.597378,
            place: "Patraput",
          },
          {
            long: 82.202072,
            lat: 19.667443,
            place: "Umerkote",
          },
          {
            long: 82.804276,
            lat: 19.607495,
            place: "Bandigaon",
          },
          {
            long: 86.626538,
            lat: 20.607209,
            place: "Palapatana",
          },
          {
            long: 85.634348,
            lat: 19.900456,
            place: "jodapadar",
          },
          {
            long: 82.571879,
            lat: 19.288694,
            place: "Baghasiuni",
          },
          {
            long: 81.637769,
            lat: 18.075635,
            place: "Girikanpali",
          },
          {
            long: 85.192866,
            lat: 20.326252,
            place: "Bhapur",
          },
          {
            long: 85.705210,
            lat: 19.772022,
            place: "Sipasurubili",
          },
          {
            long: 83.971155,
            lat: 21.438702,
            place: "Chaurpur",
          },
        ];







        const getLocationBtn = document.getElementById("getLocationBtn");
        const locationResult = document.getElementById("locationResult");
        const locationToGo = document.getElementById("locationToGo");

        getLocationBtn.addEventListener("click", () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const closestPlace = findClosestPlace(latitude, longitude, placesData);

                    // Use a reverse geocoding API to get location details
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                        .then((response) => response.json())
                        .then((data) => {
                            const city = data.address.city || data.address.town || data.address.village;
                            const state = data.address.state || data.address.state_district;

                            locationResult.textContent = `Your current location: ${city}, ${state}, India`;
                            locationToGo.textContent = `Nearest excavation centre is ${closestPlace.place}, Odisha`;
                            getWeather(latitude, longitude);
                            getWeatherData(latitude, longitude);

                        })
                        .catch((error) => {
                            locationResult.textContent = `Error getting location: ${error.message}`;
                        });
                }, (error) => {
                    locationResult.textContent = `Error getting location: ${error.message}`;
                });
            } else {
                locationResult.textContent = "Geolocation is not supported in your browser.";
            }
        });

        // Function to calculate distance between two sets of coordinates
        function calculateDistance(lat1, lon1, lat2, lon2) {
          const R = 6371; // Radius of the Earth in kilometers
          const dLat = (lat2 - lat1) * (Math.PI / 180);
          const dLon = (lon2 - lon1) * (Math.PI / 180);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
              Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c; // Distance in kilometers
          return distance;
        }

        // Function to find the closest place
        function findClosestPlace(userLat, userLon, places) {
          let closestPlace = null;
          let closestDistance = Number.MAX_VALUE;

          places.forEach((place) => {
            const distance = calculateDistance(
              userLat,
              userLon,
              place.lat,
              place.long
            );

            if (distance < closestDistance) {
              closestDistance = distance;
              closestPlace = place;
            }
          });

          return closestPlace;
        }












        // Function to fetch weather data based on latitude and longitude
        function getWeather(latitude, longitude) {
            const apiUrl = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;

            fetch(apiUrl)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Weather data not available.");
                    }
                })
                .then((data) => {
                    const temperature = data.main.temp;
                    const description = data.weather[0].description;
                    const city = data.name;
                    const country = data.sys.country;

                    const weatherInfo = `${temperature}°C, ${description}`;
                    document.querySelector(".weather-info").textContent = weatherInfo;
                })
                .catch((error) => {
                    console.error(error);
                    document.querySelector(".weather-info").textContent = "Unable to fetch weather data.";
                });
        }






        // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const apiKey = '18fab628e83030ac5f438dd85158a70a';

        // Function to get weather data based on latitude and longitude
        function getWeatherData(latitude, longitude) {
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

          fetch(apiUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              // Process the weather data here
              console.log(data);

              // You can check the weather conditions and issue flood/cyclone warnings based on the data
              const weatherCondition = data.weather[0].main;

              if (weatherCondition === 'Rain' || weatherCondition === 'Thunderstorm') {

                  document.querySelector(".warning").textContent ="Flood warning: Heavy rain or thunderstorm expected.";

              } else if (weatherCondition === 'Tornado' || weatherCondition === 'Hurricane') {

                  document.querySelector(".warning").textContent ="Cyclone warning: Tornado or hurricane expected..";
              } else {

                document.querySelector(".warning").textContent ="No flood or cyclone warning..";
              }
            })
            .catch((error) => {
              console.error('There was a problem fetching the weather data:', error);
            });
        }





        window.onload = function () {

          var chart2 = new CanvasJS.Chart("chartContainer2", {
            animationEnabled: true,
            theme: "dark1", // "light1", "light2", "dark1", "dark2"
            title:{
              text: "Fatalitites occur during the incident"
            },
            axisY: {
              title: "No. of fatalities"
            },
            data: [{
              type: "column",
              showInLegend: true,
              dataPoints: [
                { y: 1, label: "Angul" },
                { y: 2,  label: "Balasore" },
                { y: 1,  label: "Bargarh" },
                { y: 4,  label: "Cuttack" },
                { y: 1,  label: "Deogarh" },
                { y: 10, label: "Jajpur" },
                { y: 0,  label: "Kalahandi" },
                { y: 0,  label: "Malkangiri" }
              ]
            }]
          });
          chart2.render();


          }
