//pre-load city coordinates
const cityData = fetch("./assets/js/cities.json")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
	});
