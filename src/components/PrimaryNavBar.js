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
							color:${this.props.palette.textColor};
						}
						.navbar-inverse .navbar-nav .open .dropdown-menu>li>a:hover {
							color:${this.props.palette.accent2Color} !important;
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

					.mainNavBarTopContainer .dropdown-menu 
					{
					    background-color: ${this.props.palette.primary2Color};
					}

					.mainNavBarTopContainer .dropdown-menu>li>a
					{
					    color: #fff;
					}

					.mainNavBarTopContainer .dropdown-menu>li>a:focus, 
					.mainNavBarTopContainer .dropdown-menu>li>a:hover
					{
						color: #000;
					    background-color: ${this.props.palette.primary2Color};
					}

					.mainNavBarInvisible {
						background-color: transparent;
						animation-name: navbaranimationreverse;
					    animation-duration: 0.5s;
					}

					.mainNavBar {
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

					.navbar-inverse .navbar-nav>.active>a, 
					.navbar-nav>li>a:hover
					{
					    border-bottom: 3px ${this.props.palette.accent1Color} solid;
					    color: ${this.props.palette.textColor} !important;
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
						<LinkContainer to={link.link} key={i}>
							<NavItem eventKey={i + (i /10)} >{link.title}</NavItem>
						</LinkContainer>
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
			containerWidth: 0
		}
	}

	handleWaypointOnPositionChange = ({ previousPosition, currentPosition }) => {
		console.log(currentPosition);
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

		let that = this;
		return(
			<div>

				<PrimaryNavBarCSS palette={this.props.muiTheme.palette} />

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