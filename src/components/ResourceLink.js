import React from 'react';
import Paper from '@material-ui/core/Paper';

import { Thumbnail } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


class ResourceLinkCSS extends React.PureComponent {
	render() {

		return(
			<div dangerouslySetInnerHTML={{
			__html: `
				<style>
					.kokolib_resource_link {
						-webkit-transition: 1s;
						-moz-transition: 1s;
						-o-transition: 1s;
						transition: 1s;
					}

					.kokolib_resource_link.focused {
						transform:scale(1.03) !important;
					}

				</style>
				`
			}} />
		);
	}
}

class ResourceLink extends React.PureComponent
{

    constructor(props) {
        super(props);
        this.state = {
            focused: false
        }
    }

	getStyles() {
		const styles = {
			anchor: {
				textDecoration: 'none'
			},
			paper: {
				padding:0,
				marginLeft: 'auto',
				marginRight: 'auto',
				textDecoration: 'none'
			},
			container: {
				width:'100%',
				minHeight:300,
				textAlign: 'left',
				padding:0,
				margin:0,
				textDecoration: 'none'
			},
			image: {
				width: '100%',
				height: 200,
				backgroundSize: 'contain',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundImage: 'url(' + this.props.image + ')'
			},
			title: {
				fontSize:'1.2em',
				fontWeight: 'bold',
				marginTop: 3,
				textDecoration: 'none'
			},
			description: {
				textDecoration: 'none'
			}
		};
		return styles;
	}

    onHoverEnter = () => {
        this.setState({
            focused: true
        });
    };

    onHoverLeave = () => {
        this.setState({
            focused: false
        });
    };

	render() {

		const styles = this.getStyles();

        const componentClasses = ['kokolib_resource_link'];
        if (this.state.focused) { componentClasses.push('focused'); }

		return(
			<div>
				<ResourceLinkCSS />
				<a href={this.props.link} target="_blank" style={styles.anchor}>

					<div className={componentClasses.join(' ')}
						onMouseEnter={this.onHoverEnter}
	                    onMouseLeave={this.onHoverLeave}>

						<Paper zDepth={3} style={styles.paper}>
							<Thumbnail style={styles.container} >
									<div style={styles.image} />
									<p style={styles.title}>{this.props.title}</p>
									<p style={styles.description}>{this.props.description}</p>
							</Thumbnail>

						</Paper>
					</div>
				</a>
			</div>
		);
	}
}

export default ResourceLink;
