import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Utils from '../Utils';

class SocialMediaButton extends React.PureComponent {

    static propTypes = {
        icon: React.PropTypes.string,
        link: React.PropTypes.string,
        name: React.PropTypes.string
    };

    static defaultProps = {
        icon: 'envelope',
        link: 'mailto:you@email.com',
        name: 'Email', 
    };

	getStyles() {

		let palette = this.props.muiTheme.palette;

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
				color: 'inherit',
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
							.icon:before {
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
						</style>
						`
					}} />
					<a className={"icon fa-" + this.props.icon} href={this.props.link} style={styles.link} >
						<span className="label" style={{display:"none"}}>
							{Utils.toTitleCase(this.props.name)}
						</span>
					</a>
				</li>
		);
	}
}


export default muiThemeable()(SocialMediaButton);
