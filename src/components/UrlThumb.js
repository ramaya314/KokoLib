import React from 'react';
import Paper from '@material-ui/core/Paper';
import {Col, Row, Image} from 'react-bootstrap';
import dateFormat from 'dateformat';
import Spacer from './Spacer';
import PropTypes from 'prop-types';


class UrlThumbCss extends React.PureComponent {
	render() {

		return(
			<div dangerouslySetInnerHTML={{
			__html: `
				<style>
					.kokolib_url_thumb {
						-webkit-transition: 1s;
						-moz-transition: 1s;
						-o-transition: 1s;
						transition: 1s;
					}

					.kokolib_url_thumb.focused {
						transform:scale(1.03) !important;
					}

				</style>
				`
			}} />
		);
	}
}

class UrlThumb extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            focused: false
        }
    }


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
						<Image src={this.props.image} style={styles.image}  className="kokolib_url_thumb_image"/>
					</Col>
				}
				<Col xs={12}
					sm={hasImage ? 7 : 12}
					md={hasImage ? 8 : 12}
					lg={hasImage ? 8 : 12} >
					<div className="kokolib_url_thumb_container">
						<h2 className="kokolib_url_thumb_title"> {this.props.title}</h2>
						<div style={styles.contentContainer}  className="kokolib_url_thumb_description">
							{this.props.description}
						</div>
					</div>
				</Col>
			</Row>
		);
	}

	render() {

    	const styles = this.getStyles();

    	var hasImage = this.props.image && this.props.image.length > 0;

        const componentClasses = ['kokolib_url_thumb'];
        if (this.state.focused) { componentClasses.push('focused'); }

    	if(this.props.url && this.props.url.length > 0)
			return(
				<div>
					<UrlThumbCss />
					<a  href={this.props.url} target="_blank">

						<div className={componentClasses.join(' ')}
							onMouseEnter={this.onHoverEnter}
		                    onMouseLeave={this.onHoverLeave}>
							<Paper  style={styles.paperStyle} zDepth={3} >
								{this.renderContent()}
							</Paper>
						</div>
					</a>
				</div>
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
