import React from 'react';
import Waypoint from 'react-waypoint';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav,
			Image} from 'react-bootstrap';

import { IndexLinkContainer } from 'react-router-bootstrap';

import Dimensions from 'react-dimensions';
import muiThemeable from 'material-ui/styles/muiThemeable';

class PrimaryNavBarCSS extends React.PureComponent {
	render() {

		return(
			<div dangerouslySetInnerHTML={{
			__html: `
				<style>
					@keyframes navbaranimation {
					    from {
					    	background-color: transparent;
					    }
					    to {
					    	background-color: ${this.props.palette.primary1Color};
					    }
					}

					@keyframes navbaranimationreverse {
					    from {
					    	background-color: ${this.props.palette.primary1Color};
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
							color:${this.props.palette.accent1Color} !important;
					    	background-color: ${this.props.palette.primary3Color};
						}

						.navbar-inverse .navbar-nav .open .dropdown-menu>.active>a{
					    	background-color: ${this.props.palette.primary2Color};
						}
					}

					.navbar-inverse .navbar-nav>.open>a,
					.navbar-inverse .navbar-nav>.open>a:focus,
					.navbar-inverse .navbar-nav>.open>a:hover,
					.navbar-inverse .navbar-nav>.active>a, 
					.navbar-inverse .navbar-nav>.active>a:focus, 
					.navbar-inverse .navbar-nav>.active>a:hover
					{
						background-color: ${this.props.palette.primary2Color} !important;
					}

					.kokolib_navbarcontainer .dropdown-menu 
					{
					    background-color: ${this.props.palette.primary1Color};
					}

					.kokolib_navbarcontainer .dropdown-menu>li>a
					{
					    color: #fff;
					}

					.kokolib_navbarcontainer .dropdown-menu>li>a:focus, 
					.kokolib_navbarcontainer .dropdown-menu>li>a:hover
					{
						color: ${this.props.palette.accent2Color};
					    background-color: ${this.props.palette.primary3Color};
					}
					.kokolib_navbarcontainer .dropdown-menu>.active>a, 
					.kokolib_navbarcontainer .dropdown-menu>.active>a:focus, 
					.kokolib_navbarcontainer .dropdown-menu>.active>a:hover {

						color: ${this.props.palette.accent1Color};
					    background-color: ${this.props.palette.primary2Color};
					}

					.navbar
					{
						font-family: ${this.props.theme.headerFontFamily ? this.props.theme.headerFontFamily : this.props.theme.fontFamily}
					}

					.mainNavBarInvisible {
						background-color: transparent;
						animation-name: navbaranimationreverse;
					    animation-duration: 0.5s;
					}

					.mainNavBar {
					    background-color: ${this.props.palette.primary1Color};
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
						color:#fff !important;
					    border-bottom: 3px transparent solid;
					}
					.nav .open>a, 
					.nav .open>a:focus, 
					.nav .open>a:hover {
					    border-bottom: 3px ${this.props.palette.accent1Color} solid;
					}

					.navbar-inverse .navbar-nav>.active>a, 
					.navbar-nav>li>a:hover
					{
					    border-bottom: 3px ${this.props.palette.accent1Color} solid;
					    color: ${this.props.palette.accent1Color} !important;
					}

					.navbar-inverse .navbar-toggle {
						border: none;
    					margin-right: 40px;
					}

					.navbar-inverse .navbar-toggle:focus, 
					.navbar-inverse .navbar-toggle:hover
					{
					    background-color: ${this.props.palette.primary2Color};
					}


				</style>
				`
			}} />
		);
	}
}

class NavigationGroup extends React.PureComponent{

    static propTypes = {
        title: React.PropTypes.string,
        index: React.PropTypes.number,
        children: React.PropTypes.array
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
        logoImagePath: React.PropTypes.string,
        visibilityToggleOffset: React.PropTypes.number,
        navigationScheme: React.PropTypes.array
    };

    static defaultProps = {
        logoImagePath: "",
        visibilityToggleOffset: 0,
        navigationScheme: []
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
			navbarBrandVisible: currentPosition === 'above'
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

				<PrimaryNavBarCSS palette={this.props.muiTheme.palette} theme={this.props.muiTheme} />

				<Navbar inverse collapseOnSelect staticTop fixedTop fluid style={styles.navBar}  
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


export default muiThemeable()(Dimensions()(PrimaryNavBar));