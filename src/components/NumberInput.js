import React from 'react';

class NumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.default || '',
			errorMessage: ''
		};
	}

	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			value: e.target.value,
			errorMessage: e.target.validationMessage
		});
		this.props.handleChange(e.target.value);
	};

	render() {
		const { name, min, placeholder, label } = this.props;
		const { errorMessage, value } = this.state;
		return (
			<div className='text-left my-4'>
				<label htmlFor={name}> {label}</label>
				<input
					type='number'
					className='form-control'
					name={name}
					id={name}
					value={value}
					min={min}
					onChange={this.handleChange}
					required
					placeholder={placeholder}
				/>
				<div className='text-danger p-3'>{errorMessage}</div>
			</div>
		);
	}
}
export default NumberInput;
