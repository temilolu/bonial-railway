import React from 'react';

const Header = ({ name }) => (
	<nav className='navbar navbar-dark bg-dark'>
		<div className='container'>
			<h1 className='navbar-brand'>{name}</h1>
		</div>
	</nav>
);

export default Header;
