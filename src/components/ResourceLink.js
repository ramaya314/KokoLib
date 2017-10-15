import React from 'react';
import Paper from 'material-ui/Paper';

import { Thumbnail } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ResourceLink extends React.PureComponent
{

	getStyles() {
		const styles = {
			anchor: {
				textDecoration: 'none !important'
			},
			paper: {
				padding:0,
				marginLeft: 'auto',
				marginRight: 'auto',
				textDecoration: 'none !important'
			},
			container: {
				width:'100%',
				minHeight:300,
				textAlign: 'left',
				padding:0,
				margin:0,
				textDecoration: 'none !important'
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
				textDecoration: 'none !important'
			},
			description: {
				textDecoration: 'none !important'
			}
		};
		return styles;
	}
	render() {

		const styles = this.getStyles();

		return(
			<a href={this.props.link} target="_blank" style={styles.anchor}>
				<Paper zDepth={3} style={styles.paper}>
					<Thumbnail style={styles.container} >
							<div style={styles.image} />
							<p style={styles.title}>{this.props.title}</p>
							<p style={styles.description}>{this.props.description}</p>
					</Thumbnail>
				</Paper>
			</a>
		);
	}
}

export default ResourceLink;