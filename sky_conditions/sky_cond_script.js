function getJson() {
	fetch("sky_conditions.json")
	.then(function (res) {
		return res.json();
	})
	.then(function (data) {
		console.log(data.skyConditions);
		let output = "";
		data.skyConditions.forEach(function (data) {
			output += `<li>${data.day}</li>`;
		});
		document.getElementById("output").innerHTML = output;
	})
	.catch(function (error) {
		console.log(error);
	});
}

getJson();