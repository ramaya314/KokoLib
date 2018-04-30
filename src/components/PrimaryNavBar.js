import React from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav,
			Image} from 'react-bootstrap';

import { IndexLinkContainer } from 'react-router-bootstrap';

import Dimensions from 'react-dimensions';
import { withTheme } from 'material-ui/styles';

class PrimaryNavBarCSS extends React.PureComponent {
	render() {

		var textColor = (this.props.palette.navBarTextColor || this.props.palette.textColor);
		var selectedTextColor = (this.props.palette.navBarSelectedTextColor || this.props.palette.accent1Color);
		var hoverTextColor = (this.props.palette.navBarHoverTextColor || this.props.palette.accent2Color);

		var backgroundColor = (this.props.palette.navBarBackgroundColor || this.props.palette.primary1Color);
		var hoverBackgroundColor = (this.props.palette.navBarHoverBackgroundColor || this.props.palette.primary3Color);
		var selectedBackgroundColor = (this.props.palette.navBarSelectedBackgroundColor || this.props.palette.primary2Color);

		var decorationColor = (this.props.palette.navBarDecorationColor || this.props.palette.accent1Color);

		var font =  this.props.theme.headerFontFamily ? this.props.theme.headerFontFamily : this.props.theme.fontFamily;

		return(
			<div dangerouslySetInnerHTML={{
			__html: `
				<style>
					@keyframes navbaranimation {
					    from {
					    	background-color: transparent;
					    }
					    to {
					    	background-color: ${backgroundColor};
					    }
					}

					@keyframes navbaranimationreverse {
					    from {
					    	background-color: ${backgroundColor};
					    }
					    to {
					    	background-color: transparent;
					    }
					}

					@media (max-width: 767px) {
						.navbar-inverse .navbar-nav .open .dropdown-menu>li>a {
							color:#fff;
						}
						.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover,
						.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a:hover {
							color:${hoverTextColor} !important;
					    	background-color: ${hoverBackgroundColor};
						}

						.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a{
					    	background-color: ${selectedBackgroundColor};
						}
					}

					.navbar-inverse .navbar-nav>.open>a,
					.navbar-inverse .navbar-nav>.open>a:focus,
					.navbar-inverse .navbar-nav>.open>a:hover,
					.navbar-inverse .navbar-nav>.active>a,
					.navbar-inverse .navbar-nav>.active>a:focus,
					.navbar-inverse .navbar-nav>.active>a:hover
					{
						background-color: ${selectedBackgroundColor} !important;
					}

					.kokolib_navbarcontainer .dropdown-menu
					{
					    background-color: ${backgroundColor};
					}

					.kokolib_navbarcontainer .dropdown-menu>li>a
					{
					    color: #fff;
					}

					.kokolib_navbarcontainer .dropdown-menu>li>a:focus,
					.kokolib_navbarcontainer .dropdown-menu>li>a:hover
					{
						color: ${hoverTextColor};
					    background-color: ${hoverBackgroundColor};
					}
					.kokolib_navbarcontainer .dropdown-menu>.active>a,
					.kokolib_navbarcontainer .dropdown-menu>.active>a:focus,
					.kokolib_navbarcontainer .dropdown-menu>.active>a:hover {

						color: ${selectedTextColor};
					    background-color: ${selectedBackgroundColor};
					}

					.navbar
					{
						font-family: ${font}
					}

					.mainNavBarInvisible {
						background-color: transparent;
						animation-name: navbaranimationreverse;
					    animation-duration: 0.5s;
					}

					.mainNavBar {
					    background-color: ${backgroundColor};
						animation-name: navbaranimation;
					    animation-duration: 0.5s;
					}

					.mainNavBarFullVisible {
						-webkit-box-shadow: inset 0 -45px 100px -30px ${this.props.palette.accent1Color};
					}

					.navbar-nav {
						margin: 0px -15px;
					}
					.navbar-nav>li>a {
						color:${textColor} !important;
					    border-bottom: 3px transparent solid;
					}
					.nav .open>a,
					.nav .open>a:focus,
					.nav .open>a:hover {
					    border-bottom: 3px ${decorationColor} solid;
					}

					.navbar-inverse .navbar-nav>.active>a,
					.navbar-nav>li>a:hover
					{
					    border-bottom: 3px ${decorationColor} solid;
					    color: ${selectedTextColor} !important;
					}

					.navbar-inverse .navbar-toggle {
						border: none;
    					margin-right: 40px;
					}

					.navbar-inverse .navbar-toggle:focus,
					.navbar-inverse .navbar-toggle:hover
					{
					    background-color: ${hoverBackgroundColor};
					}

					.navbar-default .navbar-toggle {
						border: 0;
					}


				</style>
				`
			}} />
		);
	}
}

class NavigationGroup extends React.PureComponent{

    static propTypes = {
        title: PropTypes.string,
        index: PropTypes.number,
        children: PropTypes.array
    };

    static defaultProps = {
        title: "",
        index: 0,
        children: []
    };

	render() {
		return(

			<NavDropdown eventKey={this.props.index}
				title={this.props.title}
				id={"navigation-group-dropdown-" + this.props.index} >

				{this.props.children.map(function(link, i) {
					if(link.children && link.children != null && link.children.length > 0) {
						return(
							<NavigationGroup {...link} key={i} index={i} />
						);
					}
					return(
						<IndexLinkContainer to={link.link} key={i}>
							<NavItem eventKey={i + (i /10)} >{link.title}</NavItem>
						</IndexLinkContainer>
					);
				})}

			</NavDropdown>
		);
	}
}

class PrimaryNavBar extends React.PureComponent {

    static propTypes = {
        logoImagePath: PropTypes.string,
        visibilityToggleOffset: PropTypes.number,
        navigationScheme: PropTypes.array,
        alwaysOpaque: PropTypes.bool,
        inverse: PropTypes.bool
    };

    static defaultProps = {
        logoImagePath: "",
        visibilityToggleOffset: 0,
        navigationScheme: [],
        alwaysOpaque: false,
        inverse: false
    };

	constructor(props) {
		super(props);
		this.state = {
			navbarBrandVisible: false,
			navBarStyleChanged: false,
			navbarExpanded: false,
			navbarExpanded: false,
			containerWidth: 0,
		}
	}

	handleWaypointOnPositionChange = ({ previousPosition, currentPosition }) => {
		this.setState({
			navbarBrandVisible: this.props.alwaysOpaque || currentPosition === 'above'
		});
		currentPosition === 'above' && this.setState({
			navBarStyleChanged: true
		});
	};


	getStyles() {
		var styles = {
			navBar: {
				border:0,
			},
			navBarLogoImageContainer: {
				height: 53,
				padding: 0,
			},
			navBarLogoImage: {
				height:'100%',
			}
		}
		return styles;
	}

	getNavBarStyle() {

		//always visible on small screens
		if(this.props.containerWidth < 768)
			return "mainNavBar";

		//always starts to false so if this is true we have a change
		if(this.state.navbarBrandVisible)
			return "mainNavBar";

		//however the corellary is not true so we have to check
		if(this.state.navBarStyleChanged || this.props.containerWidth >= 768)
			return "mainNavBarInvisible";

		return "";
	}

	render() {

    	const styles = this.getStyles();

		let smallScreen = this.props.containerWidth < 768;
		let largeScreen = this.props.containerWidth >= 1200;
		let mediumScreen = !smallScreen && !largeScreen;

		let that = this;
		return(
			<div className="kokolib_navbarcontainer">

				<PrimaryNavBarCSS palette={this.props.theme.palette} theme={this.props.theme} />

				<Navbar collapseOnSelect inverse={this.props.inverse} staticTop fixedTop fluid style={styles.navBar}
				className={this.getNavBarStyle()} >
					<Navbar.Header>
						{this.state.navbarBrandVisible &&
							<Navbar.Brand>
								<a href="/" style={styles.navBarLogoImageContainer}>
									<Image src={this.props.logoImagePath} responsive style={styles.navBarLogoImage}/>
								</a>
							</Navbar.Brand>
						}
						<Navbar.Toggle />
					</Navbar.Header>

					<Navbar.Collapse>
						<Nav pullRight >

							{this.props.navigationScheme.map(function(link, i) {

								if(link.mdHidden && mediumScreen) 	return;
								if(link.lgHidden && largeScreen) 	return;
								if(link.smHidden && smallScreen) 	return;

								if(link.children && link.children != null && link.children.length > 0) {
									return(
										<NavigationGroup {...link} key={i} index={i + 1} />
									);
								}
								return(
									<IndexLinkContainer to={link.link} key={i} >
										<NavItem eventKey={i + 1} >{link.title}</NavItem>
									</IndexLinkContainer>
								);
							})}
						</Nav>
					</Navbar.Collapse>

				</Navbar>

				<Waypoint topOffset={this.props.visibilityToggleOffset * -1}
					onPositionChange={this.handleWaypointOnPositionChange} />
			</div>
		);
	}
}


export default withTheme()(Dimensions()(PrimaryNavBar));
