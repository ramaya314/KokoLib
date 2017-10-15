import React from 'react';
import Paper from 'material-ui/Paper';

import { Thumbnail } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ResourceLink extends React.PureComponent
{

	getStyles() {
		const styles = {

			container: {
				width:250,
				height:300,
				marginLeft: 'auto',
				marginRight: 'auto',
				textAlign: 'right',
			},
			image: {
				width: '100%',
				height: 200,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundImage: 'url(' + this.props.image + ')'
			},
			title: {
				fontSize:'1.2em',
				fontWeight: 'bold',
				marginTop: 3,
			},
			description: {

			}
		};
		return styles;
	}
	render() {

		const styles = this.getStyles();

		return(
			<Paper zDepth={3} >
				<LinkContainer to={this.props.link}>
					<Thumbnail style={styles.container} >
						<div style={styles.image} />
						<p style={styles.title}>{this.props.title}</p>
						<p style={styles.description}>{this.props.description}</p>
					</Thumbnail>
				</LinkContainer>
			</Paper>
		);
	}
}

export default ResourceLink;