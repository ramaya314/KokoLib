import React from 'react';
import SocialMediaButtons from './SocialMediaButtons';

import muiThemeable from 'material-ui/styles/muiThemeable';

class MainFooter extends React.PureComponent {

    static propTypes = {
        buttons: React.PropTypes.array,
        orgName: React.PropTypes.string
    };

    static defaultProps = {
        buttons: [],
        orgName: "Your Organization"
    };

	getStyles() {

		let palette = this.props.muiTheme.palette;

		const styles = {
			footer: {
				backgroundColor: palette.primary1Color,
				position: "relative",
				overflow: "hidden",
				padding: '4em 0 4em 0',
				color: palette.textColor,
			},
			footerBefore: {
				content: "",
				height: "100%",
				left: 0,
				margin: "0 auto",
				pointerEvents: "none",
				position: "absolute",
				right: 0,
				top: 0,
				zIndex: 1,
			},
			contact: {
				textAlign: 'center',
			},
			copyRight: {
				textAlign: 'center',
				color: 'rgba(156, 156, 156, 0.80)',
				fontSize: '0.9em',
				cursor: 'default',
			}
		}
		return styles;
	}

	render() {

    	const styles = this.getStyles();

		return(

  			<div style={styles.footer}>

  				<div style={styles.footerBefore} />
  				<div className="contact" style={styles.contact}>

  					<SocialMediaButtons {...this.props} />

					<div className="copyright" style={styles.copyRight}>
						<ul className="menu">
							<li style={{listStyle:"none"}} >&copy; {this.props.orgName}. All rights reserved.</li>
						</ul>
					</div>
				</div>
  			</div>
		);
	}
}


export default muiThemeable()(MainFooter);