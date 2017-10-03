import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SocialMediaButton from '../elements/SocialMediaButton';

import tinycolor from 'tinycolor2';

class SocialMediaButtons extends React.PureComponent {


    static propTypes = {
        buttons: React.PropTypes.array
    };

    static defaultProps = {
        buttons: []
    };

	getStyles() {

		let palette = this.props.muiTheme.palette;

		let backTinyColor = tinycolor(palette.primary1Color.toString());
		let background = backTinyColor.isDark() ? backTinyColor.lighten(10) : backTinyColor.darken(10);

		const styles = {
			icons: {
				position: 'relative',
				background: background.toString(),
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