import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row, Image} from 'react-bootstrap';
import dateFormat from 'dateformat';
import Spacer from './Spacer';
import PropTypes from 'prop-types';


class UrlThumb extends React.Component
{

    static propTypes = {
    	url: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        targetPageRoot: PropTypes.string
    };

    static defaultProps = {
    	url: "",
        title: "",
        image: "",
        description: "",
        targetPageRoot: ""
    };



	getStyles() {
		const styles = {
			paperStyle : {
				margin: 0,
				padding: 15,
			},
			contentContainer: {
			},
			image: {
				width:'100%'
			}
		}
		return styles;
	}

	getFirstImageFromContent(content) {
		return <Image />;
	}

	stripFirstImageFromContent(content) {
		return content;
	}

	renderContent() {

    	const styles = this.getStyles();

    	var hasImage = this.props.image && this.props.image.length > 0;

		return(
			<Row>
				{hasImage && 
					<Col xs={12} sm={5} md={4} lg={4}>
						<Image src={this.props.image} style={styles.image} />
					</Col>
				}
				<Col xs={12} 
					sm={hasImage ? 7 : 12} 
					md={hasImage ? 8 : 12} 
					lg={hasImage ? 8 : 12} >
					<h2> {this.props.title}</h2>
					<div style={styles.contentContainer}>
						{this.props.description}
					</div>

				</Col>
			</Row>
		);
	}

	render() {

    	const styles = this.getStyles();

    	var hasImage = this.props.image && this.props.image.length > 0;

    	if(this.props.url && this.props.url.length > 0)
			return(
				<a  href={this.props.url} target="_blank">
					<Paper  style={styles.paperStyle} zDepth={3} >
						{this.renderContent()}
					</Paper>
				</a>
			);
		else
			return (
				<div>
					{this.renderContent()}
				</div>
			);
	}
}


export default UrlThumb;