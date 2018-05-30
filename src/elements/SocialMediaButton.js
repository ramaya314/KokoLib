import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Utils from '../Utils';
import PropTypes from 'prop-types';

class SocialMediaButton extends React.PureComponent {

    static propTypes = {
        icon: PropTypes.string,
        link: PropTypes.string,
        name: PropTypes.string
    };

    static defaultProps = {
        icon: 'envelope',
        link: 'mailto:you@email.com',
        name: 'Email',
    };

	getStyles() {

    let palette = this.props.theme.palette;

		const styles = {
			container: {
				listStyle: 'none',
				display: 'inline-block',
			},
			link: {
				display: 'inline-block',
				background: 'none',
				width: '2.5em',
				height: '2.5em',
				lineHeight: '2.5em',
				textAlign: 'center',
				borderRadius: '100%',
				border: 0,
				color: palette.textColor,
			}
		}
		return styles;
	}

	render() {

		var styles = this.getStyles();

		return(

				<li style={styles.container}>
					<div dangerouslySetInnerHTML={{
					__html: `
						<style>
							.kokoLib_socialMediaIcon:before {
								display: inline-block;
								font-family: FontAwesome;
								font-size: 1.25em;
								text-decoration: none;
								font-style: normal;
								font-weight: normal;
								line-height: 1;
								-webkit-font-smoothing: antialiased;
								-moz-osx-font-smoothing: grayscale;
							}

							.kokoLib_socialMediaIcon:hover {
								color: ${this.props.theme.palette.accent1Color} !important;
							}
						</style>
						`
					}} />
					<a className={"kokoLib_socialMediaIcon fa-" + this.props.icon}
						href={this.props.link}
						style={styles.link} >
						<span className="label" style={{display:"none"}}>
							{Utils.toTitleCase(this.props.name)}
						</span>
					</a>
				</li>
		);
	}
}


export default withTheme()(SocialMediaButton);
