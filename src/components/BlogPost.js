import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row} from 'react-bootstrap';
import dateFormat from 'dateformat';
import Spacer from './Spacer';
import DataContainer from './DataContainer';

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

		return(
			<Paper  style={styles.paperStyle} zDepth={3} >
				<Row>
					<Col xs={12}>

						<DataContainer action="api/v1/GetPageMeta" 
							parameters={[
								{id:"url", value: that.props.data.url}
							]}
							resultRender={function(metadata) {
								console.log(metadata);
								return (
									<MetaTags>
										<meta id="og-title" property="og:title" content={metadata.title} />
										<meta id="og-image" property="og:image" content={metadata.image} />
										<meta id="og-description" property="og:description" content={metadata.description} />
									</MetaTags>
								)
						}}>
						</DataContainer>

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