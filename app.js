window.addEventListener("load", () => {
	let long;
	let lat;

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
				});
		});
	}
});
