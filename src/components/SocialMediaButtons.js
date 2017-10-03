import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SocialMediaButton from '../elements/SocialMediaButton';

import {fade} from 'material-ui/utils/colorManipulator';

class SocialMediaButtons extends React.PureComponent {


    static propTypes = {
        buttons: React.PropTypes.array
    };

    static defaultProps = {
        buttons: []
    };

	getStyles() {

		let palette = this.props.muiTheme.palette;

		const styles = {
			icons: {
				position: 'relative',
				background: fade(palette.primary1Color, 0.7),
				borderRadius: '4em',
				display: 'inline-block',
				padding: '0.35em 0.75em 0.35em 0.75em',
				fontSize: '1.25em',
				cursor: 'default',
			}
		}
		return styles;
	}

	render() {
		var styles = this.getStyles();
		return(
			<ul className="icons" style={styles.icons} >
				{this.props.buttons.map(function(button, i) {
					return(
						<SocialMediaButton link={button.link} icon={button.icon} name={button.name} key={i} />
					)
				})}
			</ul>
		);
	}
}


export default muiThemeable()(SocialMediaButtons);