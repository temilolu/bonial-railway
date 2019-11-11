import React from 'react';
import { connect } from 'react-redux';
import { UpdateAllTrains, displayPassengersFrom } from '../redux/actions';
import NumberInput from './NumberInput';
import { trainAStops, trainBStops, trainCStops } from '../trainStops';
import Train from './Train';

class PassengersForm extends React.Component {
	constructor() {
		super();
		this.state = {
			trainAPassengers: 0,
			trainBPassengers: 0,
			trainCPassengers: 0
		};
	}

	updateTrainAPassengers = (people) => {
		this.setState({
			trainAPassengers: people
		});
	};

	updateTrainBPassengers = (people) => {
		this.setState({
			trainBPassengers: people
		});
	};

	updateTrainCPassengers = (people) => {
		this.setState({
			trainCPassengers: people
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const trainA = new Train(
			'A',
			trainAStops,
			0,
			'front',
			this.state.trainAPassengers
		);
		const trainB = new Train(
			'B',
			trainBStops,
			0,
			'front',
			this.state.trainBPassengers
		);
		const trainC = new Train(
			'C',
			trainCStops,
			0,
			'front',
			this.state.trainCPassengers
		);
		this.props.UpdateAllTrains({
			[trainA.name]: trainA,
			[trainB.name]: trainB,
			[trainC.name]: trainC
		});
		this.props.displayPassengersFrom(false);
	};

	render() {
		return (
			<section className='jumbotron text-center'>
				<div className='container'>
					<h1 className='jumbotron-heading'>
						Enter number of Passengers in each Train
					</h1>

					<form
						className='d-flex flex-column mt-10'
						onSubmit={this.handleSubmit}>
						<div className='d-flex mt-3'>
							<div className='col-4'>
								<NumberInput
									min='1'
									name='trainAPassengers'
									handleChange={this.updateTrainAPassengers}
									label='Passengers in Train A'
									placeholder='Enter Number of Passengers'
								/>
							</div>
							<div className='col-4'>
								<NumberInput
									min='1'
									name='trainAPassengers'
									handleChange={this.updateTrainBPassengers}
									label=' Passengers in Train B'
									placeholder='Enter Number of Passengers'
								/>
							</div>
							<div className='col-4'>
								<NumberInput
									min='1'
									name='trainAPassengers'
									handleChange={this.updateTrainCPassengers}
									label='Passengers in Train C '
									placeholder='Enter Number of Passengers'
								/>
							</div>
						</div>
						<div className='col-12 mt-10'>
							<button type='submit' className='btn btn-info'>
								Submit
							</button>
						</div>
					</form>
				</div>
			</section>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	UpdateAllTrains: (trainList) => dispatch(UpdateAllTrains(trainList)),
	displayPassengersFrom: (value) => dispatch(displayPassengersFrom(value))
});
export default connect(
	null,
	mapDispatchToProps
)(PassengersForm);
