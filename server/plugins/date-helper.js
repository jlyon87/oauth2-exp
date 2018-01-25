const SECONDS = 1000;

const addSeconds = (date, secondsFromNow) => {
	return new Date(date.getTime() + secondsFromNow * SECONDS);
};

const calcRemainingTime = date => {
	return date.getTime() - new Date().getTime();
};

module.exports = {
	addSeconds,
	calcRemainingTime
};
