import React from 'react';
import SocialMediaButtons from './SocialMediaButtons';
import CryptoButtons from './CryptoButtons';
import PropTypes from 'prop-types';

import { withTheme } from 'material-ui/styles';

class MainFooter extends React.PureComponent {

    static propTypes = {
        buttons: PropTypes.array,
        cryptoLinks: PropTypes.array,
        orgName: PropTypes.string,
        transparent: PropTypes.bool
    };

    static defaultProps = {
        buttons: [],
        cryptoLinks: [],
        orgName: "Your Organization",
        transparent: false
    };

	getStyles() {

    let palette = this.props.theme.palette;

		const styles = {
			footer: {
				backgroundColor: (this.props.transparent ? 'transparent' : palette.footerBackgroundColor || palette.primary1Color),
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
				color: palette.primary2Color,
				fontSize: '0.9em',
				cursor: 'default',
			}
		}
		return styles;
	}

	render() {

    	const styles = this.getStyles();

		return(

  			<div style={styles.footer} >

  				<div style={styles.footerBefore} />
  				<div className="contact" style={styles.contact}>

  					<SocialMediaButtons {...this.props} />


  					{this.props.cryptoLinks && this.props.cryptoLinks.length > 0 &&
  						<CryptoButtons {...this.props} />
  					}

					<div className="copyright" style={styles.copyRight}>
						<ul className="menu" style={{padding:0}}>
							<li style={{listStyle:"none"}} >&copy; {this.props.orgName}. All rights reserved.</li>
						</ul>
					</div>

				</div>
  			</div>
		);
	}
}


export default withTheme()(MainFooter);
