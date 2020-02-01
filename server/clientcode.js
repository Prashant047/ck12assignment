
async function respond(inputText) {
	let output = await CampK12.translate(inputText, "en", "hi");
	return inputText + " -- " + output;
};
		