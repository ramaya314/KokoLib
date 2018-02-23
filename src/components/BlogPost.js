import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row} from 'react-bootstrap';
import dateFormat from 'dateformat';
import Spacer from './Spacer';
import DataContainer from './DataContainer';
import Utils from '../Utils';

import MetaTags from 'react-meta-tags';

class BlogPost extends React.Component
{
	getStyles() {
		const styles = {
			paperStyle : {
				margin: 0,
				padding: 15,
			},
		}
		return styles;
	}

	render() {


		let that = this;

		if(!this.props.data || this.props.data === null)
			return <div />

    	const styles = this.getStyles();

    	var createdDate = dateFormat(new Date(this.props.data.published), "mmmm dd, yyyy");

    	var metaDescription = Utils.stripHtml(this.props.data.content).trim().replace(/(\r\n|\n|\r)/gm, "");

    	if(metaDescription.length > 300)
    		metaDescription = metaDescription.substr(295) + "...";

    	//console.log(metaDescription);

    	var metaImageSource = Utils.getFirstImageSourceFromHtml(this.props.data.content);


		return(
			<Paper  style={styles.paperStyle} zDepth={3} >
				<Row>
					<Col xs={12}>
						<MetaTags>
							<meta id="ogTitle" property="og:title" content={this.props.data.title} />
							<meta id="ogImage" property="og:image" content={metaImageSource} />
							<meta id="ogSecureImage" property="og:image:secure_url" content={metaImageSource} />
							<meta id="ogDescription" property="og:description" content={metaDescription} />
							<meta id="ogType"  property="og:type" content="article" />
						</MetaTags>
						<h1> {this.props.data.title}</h1>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						Posted on <b>{createdDate}</b> by <b>{this.props.data.author.displayName}</b>
					</Col>

				</Row>
				<Spacer space={25} />
				<Row>
					<Col xs={12}>
						<div  dangerouslySetInnerHTML={{__html: this.props.data.content}} />
					</Col>
				</Row>
			</Paper>
		);
	}
}


export default BlogPost;