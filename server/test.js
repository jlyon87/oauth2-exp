const oneHour = 60 * 60 * 1000;
const later = new Date(new Date().getTime() + oneHour);

setTimeout(() => {
	const now = new Date();
	const msDifference = now.getTime() - later.getTime();

	console.log("difference", msDifference);
}, 5 * 1000);
