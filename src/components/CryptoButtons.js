import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CryptoButton from '../elements/CryptoButton';

import tinycolor from 'tinycolor2';

class CryptoButtons extends React.PureComponent {


    static propTypes = {
        cryptoLinks: PropTypes.array
    };

    static defaultProps = {
        cryptoLinks: []
    };

	getStyles() {

		let palette = this.props.muiTheme.palette;

		let backTinyColor = tinycolor(palette.primary1Color.toString());
		let background = backTinyColor.isDark() ? backTinyColor.lighten(10) : backTinyColor.darken(10);

		const styles = {
			container: {

			},
			icons: {
				position: 'relative',
				display: 'inline-block',
				background: background.toString(),
				borderRadius: '4em',
				padding: '0.35em 0.75em 0.35em 0.75em',
				fontSize: '1.25em',
				cursor: 'default',
			},
			label: {
				display: "inline-block"
			}
		}
		return styles;
	}

	render() {
		var styles = this.getStyles();
		return(
			<div>
			<ul className="icons" style={styles.icons} >

				<div style={styles.label} >
					Donate:
				</div>
				{this.props.cryptoLinks.map(function(button, i) {
					return(
						<CryptoButton {...button} key={i} />
					)
				})}
			</ul>
			</div>
		);
	}
}

export default withTheme()(CryptoButtons);
