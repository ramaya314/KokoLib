import React from 'react';

class SocialMediaButtons extends React.PureComponent {

	render() {
		return(
			<ul className="icons">
				<li><a className="icon fa-facebook" href={"https://www.facebook.com/" + this.props.facebookHandle + "/"}><span className="label">Facebook</span></a></li>
				<li><a className="icon fa-twitter" href={"https://twitter.com/masondreamers"}><span className="label">Twitter</span></a></li>
				<li><a className="icon fa-envelope" href={"mailto:gmumasondreamers@gmail.com"}><span className="label">Mail</span></a></li>
				<li><a className="icon fa-instagram" href={"https://www.instagram.com/masondreamers/"}><span className="label">Instagram</span></a></li>
				<li><a className="icon fa-youtube" href={"https://www.youtube.com/channel/UC8LZpYov_7kqUB_ke29zEeQ"}><span className="label">Dribbble</span></a></li>
			</ul>
		);
	}
}


export default SocialMediaButtons;