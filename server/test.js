const oneHour = 60 * 60 * 1000;
const later = new Date(new Date().getTime() + oneHour);

const calcExpiryTime = (secondsFromNow) => {
	return new Date(new Date().getTime() + secondsFromNow * 1000);
};
const expiryTime = calcExpiryTime(1200);
console.log("expiryTime " + typeof expiryTime, expiryTime);

setTimeout(() => {
	const now = new Date();
	const msDifference = now.getTime() - later.getTime();

	console.log("difference", msDifference);
}, 5 * 1000);
