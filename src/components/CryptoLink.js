import React, { Component } from 'react';
import PropTypes from 'prop-types';



class CryptoLink extends Component {
 

    static propTypes = {
        address: PropTypes.string,
        icon: PropTypes.string,
        qrCode: PropTypes.string,
    };

    static defaultProps = {
        address: null,
        icon: null,
        qrCode: null
    };

	render() {
		return (
			<div>
			</div>
		);
	}
}