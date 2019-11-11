function Train(
	name,
	stations,
	currentstopindex,
	trainDirection,
	passengers,
	stationVisited
) {
	this.name = name; // train name
	this.stations = stations; // all train station stops
	this.currentstopindex = currentstopindex; // trainCurrent Stop Index
	this.trainDirection = trainDirection; // train moving direction
	this.passengers = passengers || Math.random() * 1000; // number of passengers in train
	this.stationVisited = stationVisited || []; // list of station trains has visted till current time
}

export default Train;
