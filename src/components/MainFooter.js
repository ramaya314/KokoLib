import React from 'react';
import SocialMediaButtons from './SocialMediaButtons';

class MainFooter extends React.PureComponent {

	getStyles() {
		const styles = {
			footer: {
				backgroundColor: '#000',
			},
		}
		return styles;
	}

	render() {

    	const styles = this.getStyles();

		return(

  			<div style={styles.footer} id="footer">
  				<div className="contact">

  					<SocialMediaButtons {...this.props} />

					<div className="copyright">
						<ul className="menu">
							<li>&copy; DC Psychedelic Society. All rights reserved.</li>
						</ul>
					</div>
				</div>
  			</div>
		);
	}
}


export default MainFooter;