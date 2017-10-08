import React from 'react';

import { Grid, Col, Row, Button } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';


class TileLinkNavigation extends React.Component
{

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isLoading : true,
		}

	}   

	getStyles() {
		const styles = {
			container : {
				background: '#77B0E8',
				color: '#fff',
				margin: 10,
			},
		};
		return styles;
	}

	render() {

		const styles = this.getStyles();

		return(
			<LinkContainer to={this.props.link}>
				<Button>{this.props.linkTitle}</Button>
			</LinkContainer>
		);
	}
}


export default TileLinkNavigation;