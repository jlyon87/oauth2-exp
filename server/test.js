const calcExpiryTime = (secondsFromNow) => {
	return new Date(new Date().getTime() + secondsFromNow * 1000);
};
const expiryTime = calcExpiryTime(1200);
console.log("expiryTime " + typeof expiryTime, expiryTime);

// *****
const now = new Date();
const later = calcExpiryTime(1200);

const difference = now.getTime() - later.getTime();
console.log("difference", difference);

const otherDiff = later.getTime() - now.getTime();
console.log("otherDiff", otherDiff);
