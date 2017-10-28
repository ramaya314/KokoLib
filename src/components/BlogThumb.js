import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row, Image} from 'react-bootstrap';
import dateFormat from 'dateformat';
import Spacer from './Spacer';
import PropTypes from 'prop-types';


class BlogThumb extends React.Component
{

    static propTypes = {
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        targetPageRoot: PropTypes.string
    };

    static defaultProps = {
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

	render() {


    	const styles = this.getStyles();

    	console.log(this.props.match);

		return(
				<a  href={`${this.props.targetPageRoot}/${this.props.postId}`} >
					<Paper  style={styles.paperStyle} zDepth={3} >
						<Row>
							<Col xs={12} sm={5} md={4} lg={4} >
								<Image src={this.props.image} style={styles.image} />
							</Col>
							<Col xs={12} sm={7} md={8} lg={8} >
								<h2> {this.props.title}</h2>
								<div style={styles.contentContainer}>
									{this.props.description}
								</div>

							</Col>
						</Row>
					</Paper>
				</a>
		);
	}
}


export default BlogThumb;