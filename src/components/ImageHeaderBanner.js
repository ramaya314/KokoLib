import React from 'react';

import {Image, Grid, Row, Col} from 'react-bootstrap';
import { withTheme } from '@material-ui/core/styles';
import Dimensions from 'react-dimensions';
import PropTypes from 'prop-types';

class ImageHeaderBannerCSS extends React.PureComponent {
	render() {
		return(
			<div dangerouslySetInnerHTML={{
			__html: `
				<style>


					.headerBannerScreen::before{
						content: "";
						height: 100%;
						left: 0;
						margin: 0 auto;
						pointer-events: none;
						position: absolute;
						right: 0;
						top: 0;
						z-index: 1;
						-webkit-box-shadow: inset -40px 0 20px -20px #31302f, inset 40px 0 20px -20px #31302f;
						-moz-box-shadow: inset -40px 0 20px -20px #31302f, inset 40px 0 20px -20px #31302f;
						box-shadow: inset -40px 0 20px -20px #31302f, inset 40px 0 20px -20px #31302f;
					}

					.headerBannerScreen::after{
						content: "";
						height: 100%;
						left: 0;
						margin: 0 auto;
						pointer-events: none;
						position: absolute;
						right: 0;
						top: 0;
						z-index: 1;
						-webkit-box-shadow: inset 0 30px 40px 20px rgba(0, 0, 0, 0.4), inset 0 -150px 69px 1px rgba(0, 0, 0, 0.41);
						-moz-box-shadow: inset 0 30px 40px 20px rgba(0, 0, 0, 0.4), inset 0 -150px 69px 1px rgba(0, 0, 0, 0.41);
						box-shadow: inset 0 30px 40px 20px rgba(0, 0, 0, 0.4), inset 0 -150px 69px 1px rgba(0, 0, 0, 0.41);
					}

					kokolib_headerBanner_title

				</style>
				`
			}} />
		);
	}
}



class ImageHeaderBanner extends React.Component {

    static propTypes = {
        bannerContent: PropTypes.node,
        pageTitle: PropTypes.string,
        bannerLogoImagePath: PropTypes.string,
        backgroundImage: PropTypes.string,
        fixedAttachment: PropTypes.bool,
        addShadowScreen: PropTypes.bool,
    };

    static defaultProps = {
        bannerContent: null,
        pageTitle: "",
        backgroundImage: "",
        bannerLogoImagePath: "",
        fixedAttachment: false,
        addShadowScreen: true
    };

	getStyles() {

		let smallScreen = this.props.containerWidth < 768;
		let largeScreen = this.props.containerWidth >= 1200;
		let mediumScreen = !smallScreen && !largeScreen;

		var styles = {
			headerBanner: {
				backgroundImage: 'url("' + this.props.backgroundImage + '")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				margin: 0,
				padding: 0,
				border: 0,
				height: smallScreen ? 250 : mediumScreen ? 350 : 450,
				textAlign: 'center',
				position: 'relative'
			},
			bannerLegend: {
				color: 'rgb(254, 190, 16)',
				fontSize: 'xx-large',
				fontWeight: 'bold',
				textShadow: '2px 2px #000',
			},
			bannerContent: {
				textAlign: 'center',
				position: 'absolute',
				top: smallScreen ? 75 : mediumScreen ? 100 : 150,
				width: '100%',
				zIndex: 14
			},
			bannerLogo: {
				marginLeft: 'auto',
				marginRight: 'auto',
				maxWidth: smallScreen ? '45%' : mediumScreen ? '25%' : '20%',
				maxHeight: smallScreen ? 200 : mediumScreen ? 275 : 300,
			},
			bannerScreen: {
				position: 'relative',
				top: 0,
				left: 0,
				height: '100%',
				width: '100%',
				backgroundColor: 'rgba(0,0,0,0' + (this.props.addShadowScreen ? '.2' : '') + ')',
				zIndex:1,
			},
			bannerTitle: {
				position: 'absolute',
				bottom: 0,
				width: '100%',
				marginLeft: 0,
				color: '#fff',
				fontSize: '3em',
				fontWeight: 'bold',
				textShadow: '2px 2px #000',
				textAlign: 'left',
				zIndex: 15,
			},
		}

		if(this.props.fixedAttachment){
			styles.headerBanner.backgroundAttachment = "fixed";
		}

		if(this.props.theme.headerFontFamily) {
			styles.bannerTitle.fontFamily = this.props.theme.headerFontFamily;
		}

		return styles;
	}

	render() {

    	const styles = this.getStyles();


		return(

  			<div style={styles.headerBanner}>

  				{this.props.addShadowScreen &&
  					<ImageHeaderBannerCSS palette={this.props.theme.palette}/>
  				}

				<div style={styles.bannerScreen} className="headerBannerScreen" />
				<div style={styles.bannerContent}>
					<div>
						{this.props.bannerContent && this.props.bannerContent !== null ? this.props.bannerContent :
							<div>
								<a href="/" className="headerLogo">
									<Image src={this.props.bannerLogoImagePath} responsive style={styles.bannerLogo} rounded/>
			  					</a>
			  				</div>
						}
					</div>
				</div>

				{this.props.pageTitle &&
					<div style={styles.bannerTitle}>
						<Grid>
							<Row>
								{this.props.pageTitle}
							</Row>
						</Grid>
					</div>
				}

  			</div>
		);
	}
}



export default withTheme()(Dimensions()(ImageHeaderBanner));
