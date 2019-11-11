import React from 'react';
import Header from './components/Header';
import { connect } from 'react-redux';
import PassengersForm from './components/PassengersForm';
import DisplayTrains from './components/DisplayTrains';

class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header name='Bonial app' />
				<div className='container my-5'>
					{this.props.displayPassengersForm && <PassengersForm />}

					{!this.props.displayPassengersForm && <DisplayTrains />}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	displayPassengersForm: state.reducer.displayPassengersForm
});

export default connect(mapStateToProps)(App);
