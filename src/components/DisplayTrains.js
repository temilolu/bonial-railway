import React from 'react';
import { connect } from 'react-redux';
import { UpdateAllTrains } from '../redux/actions';

class DisplayTrains extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalStops: 1,
			collisionsAvoided: {}
		};
		this.updateStationsVisited(
			this.props.trains.A,
			this.props.trains.B,
			this.props.trains.C
		);
	}
	displayTrainStops() {
		return (
			<div className='row'>
				{Object.entries(this.props.trains).map(([name, train]) => {
					return (
						<div className='col-md-4 my-3' key={name}>
							<div className='card mb-4 shadow-sm'>
								<div className='card-body'>
									<div className='card-text'>
										<div className='col-12'>
											<p>
												<span className='font-weight-bold text-info'>
													Train{train.name}
												</span>
											</p>
											<p>
												<span className='font-weight-bold'>
													Total Stations:
												</span>
												{train.stations.length}
											</p>
											<p>
												<span className='font-weight-bold '>
													List of Stations:
												</span>
												<span className='font-italic text-monospace'>
													{train.stations.join(', ')}
												</span>
											</p>
											<p>
												<span className='font-weight-bold'>Passengers: </span>{' '}
												{train.passengers}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}

	nextStops = (e, numberOfStops) => {
		e.preventDefault();
		this.avoidCollision(numberOfStops);
	};

	trainNextStopAndIndex(train) {
		if (train.trainDirection === 'front') {
			train.currentstopindex = train.currentstopindex + 1;
			if (train.currentstopindex === train.stations.length - 1) {
				train.trainDirection = 'back';
			}
		} else {
			train.currentstopindex = train.currentstopindex - 1;
			if (train.currentstopindex === 0) {
				train.trainDirection = 'front';
			}
		}
		return train;
	}

	// To establish which train will be passing first during the crossing.
	trainToCross(trainsList) {
		let maxTrain;
		for (let i = 0; i < trainsList.length; i++) {
			if (maxTrain) {
				if (maxTrain.passengers > trainsList[i].passengers) {
					this.updateTrainStop(trainsList[i]);
				} else {
					this.updateTrainStop(maxTrain);
				}
			} else {
				maxTrain = trainsList[i];
			}
		}
	}

	// to restore the train position when they are coming towards same station.
	updateTrainStop(train) {
		if (train.currentstopindex === train.stations.length) {
			train.currentstopindex--;
			train.trainDirection = 'front';
		} else if (train.currentstopindex === 0) {
			train.currentstopindex++;
			train.trainDirection = 'back';
		} else if (train.trainDirection === 'front') {
			train.currentstopindex--;
		} else if (train.trainDirection === 'back') {
			train.currentstopindex++;
		}
	}

	avoidCollision(numberOfStops) {
		let startStop = this.state.totalStops;
		let endStop = this.state.totalStops + numberOfStops;
		const tempCollison = {};
		let trainA = this.props.trains.A;
		let trainB = this.props.trains.B;
		let trainC = this.props.trains.C;

		while (startStop < this.state.totalStops + numberOfStops) {
			startStop++;

			//update state
			trainA = this.trainNextStopAndIndex(trainA);
			trainB = this.trainNextStopAndIndex(trainB);
			trainC = this.trainNextStopAndIndex(trainC);

			if (
				trainA.stations[trainA.currentstopindex] ===
					trainB.stations[trainB.currentstopindex] &&
				trainA.stations[trainA.currentstopindex] ===
					trainC.stations[trainC.currentstopindex]
			) {
				tempCollison[startStop] = [trainA.name, trainB.name, trainC.name];
				this.trainToCross([trainA, trainB]);
			} else if (
				trainA.stations[trainA.currentstopindex] ===
				trainB.stations[trainB.currentstopindex]
			) {
				tempCollison[startStop] = [trainA.name, trainB.name];
				this.trainToCross([trainA, trainB]);
			} else if (
				trainB.stations[trainB.currentstopindex] ===
				trainC.stations[trainC.currentstopindex]
			) {
				tempCollison[startStop] = [trainB.name, trainC.name];
				this.trainToCross([trainB, trainC]);
			} else if (
				trainA.stations[trainA.currentstopindex] ===
				trainC.stations[trainC.currentstopindex]
			) {
				tempCollison[startStop] = [trainA.name, trainC.name];
				this.trainToCross([trainA, trainC]);
			}

			// updateTrainStops
			this.updateStationsVisited(trainA, trainB, trainC);
		}
		//update componentstate and reduxstate;
		this.props.UpdateAllTrains({
			[trainA.name]: trainA,
			[trainB.name]: trainB,
			[trainC.name]: trainC
		});
		this.setState({
			collisionsAvoided: {
				...this.state.collisionsAvoided,
				...tempCollison
			},
			totalStops: endStop
		});
	}

	updateStationsVisited(trainA, trainB, trainC) {
		trainA.stationVisited.push(trainA.stations[trainA.currentstopindex]);
		trainB.stationVisited.push(trainB.stations[trainB.currentstopindex]);
		trainC.stationVisited.push(trainC.stations[trainC.currentstopindex]);
	}

	displaystationsVisited() {
		const locationVisited = [];
		for (let i = 0; i < this.state.totalStops; i++) {
			locationVisited.push(
				<tr key={i}>
					<th scope='row'>{i ? i : 'Start'}</th>
					<td>{this.props.trains.A.stationVisited[i]}</td>
					<td>{this.props.trains.B.stationVisited[i]}</td>
					<td>{this.props.trains.C.stationVisited[i]}</td>
					<td>
						{' '}
						{this.state.collisionsAvoided[i + 1] &&
							this.state.collisionsAvoided[i + 1].join(' ,')}
					</td>
				</tr>
			);
		}
		return (
			<div className='d-flex flex-column mt-10'>
				<table className='table'>
					<thead className='thead-dark'>
						<tr>
							<th scope='col'>Stops</th>
							<th scope='col'>Train A Station</th>
							<th scope='col'>Train B Station</th>
							<th scope='col'>Train C Station</th>
							<th scope='col'>Avoided Collisions</th>
						</tr>
					</thead>
					<tbody>{locationVisited}</tbody>
				</table>
			</div>
		);
	}
	render() {
		return (
			<div>
				<div>
					<h3 className='border-bottom border-gray pb-2 mb-0'>Train Stops</h3>

					<div>{this.displayTrainStops()}</div>

					<div className=''>
						<button
							type='button'
							className='btn btn-primary'
							onClick={(e) => this.nextStops(e, 1)}>
							Next Stop
						</button>
					</div>
				</div>

				<div className='my-3 p-3 bg-white rounded shadow-sm'>
					<div className='d-flex flex-column'>
						<div className='col-12 mt-10'>
							{!!this.state.totalStops && this.displaystationsVisited()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	UpdateAllTrains: (trainList) => dispatch(UpdateAllTrains(trainList))
});
const mapStateToProps = (state) => ({
	trains: state.reducer.trains
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DisplayTrains);
