window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(
		".temperature-description"
	);
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let locationIcon = document.querySelector(".weather-icon");
	let temperatureSection = document.querySelector(".temperature");
	const temperatureSpan = document.querySelector(".temperature span");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			// const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7be893c00509441f89b69283283aafd9
            `;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					const { temp } = data.main;
					const { description } = data.weather[0];
					const { name } = data;
					const { icon } = data.weather[0];
					temperatureDegree.textContent = temp;
					temperatureDescription.textContent = description;
					locationTimezone.textContent = name;
					locationIcon.innerHTML = `<img class="icon" src="icons/${icon}.png">`;
					locationIcon.style.filter = "invert(1)";
					// Formula for Celsius
					let celsius = (temp - 32) * (5 / 9);

					// Change temperature to Celsius/Farenheit
					temperatureSection.addEventListener("click", () => {
						if (temperatureSpan.textContent === "F") {
							temperatureSpan.textContent = "C";
							temperatureDegree.textContent = Math.floor(celsius);
						} else {
							temperatureSpan.textContent = "F";
							temperatureDegree.textContent = temp;
						}
					});
				});
		});
	}
});
