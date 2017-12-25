import React from 'react';
import {Image, Col, Row} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import dateFormat from 'dateformat';
import DataContainer from './DataContainer';
import Utils from '../Utils';

class EventThumbView extends React.PureComponent {

	getStyles() {
		const styles = {
			paperStyle : {
				margin: 20,
			},
			logoStyle: {
				width: '100%',
			},
			descriptionBody: {
				marginTop: 10,
				width: '100%',
			},
			eventTitle: {
				fontWeight: 'bold',
				fontSize: 20,
				color: '#000'

			},
			eventDate: {
				fontSize: 18,
			}
		};
		return styles;
	}

	render() {

		const styles = this.getStyles();

		var ellipsedText = "";
		if(this.props.data.description.text && this.props.data.description.text.length > 0)
			ellipsedText = (this.props.data.description.text).substring(0,200) + "...";

		var startDateTime = dateFormat(Utils.getValidDate(this.props.data.start.utc), "dddd, mmmm dS, yyyy");

		//console.log(this.props.data);

		var linkUrl = "";


		if(this.props.match && this.props.match.url && this.props.match.url.length > 1) {
			linkUrl += `${this.props.match.url}/`;
		}

		if(this.props.targetPageRoot && this.props.targetPageRoot.length > 0) {
			linkUrl += `${this.props.targetPageRoot}/`;
		} 

		
		if(this.props.data.fbEvent)
			linkUrl += "fb";

		linkUrl += this.props.data.id;

		linkUrl = linkUrl.replace("//", "/");

		return(
			<div>
				<a  href={linkUrl} >
	    			<Paper style={styles.paperStyle} zDepth={3} >
						{false && 
							<pre>{JSON.stringify(this.props.data, null, 4) }</pre>
						}
						<Row>

							<Col xs={12} sm={4} md={4} lg={2} lgHidden={!this.props.data.fbEvent} >
								{this.props.data.logo && !this.props.data.fbEvent &&
									<Image src={this.props.data.logo.url} style={styles.logoStyle}/>
								}

								{this.props.data.fbEvent && 
									<DataContainer action="/api/v1/GetFacebookEventPicture" 
										parameters={[
											{id:"eventId", value: this.props.data.id}
										]}
										resultRender={function(pictureData) {
											return (
												<Image src={pictureData.location} style={styles.logoStyle}/>
											);
									}} />
								}
							</Col>
							<Col xs={12} sm={8} md={8} lg={this.props.data.fbEvent ? 10 : 12}>
								<Row>
									<Col xsHidden={true} smHidden={true} mdHidden={true} lgHidden={this.props.data.fbEvent} lg={4}>

										<Image src={this.props.data.logo.url} style={styles.logoStyle}/>
									</Col>
									<Col xs={12} lg={this.props.data.fbEvent ? 12 : 8} >
										<div style={{padding:10}}>
											<div style={styles.eventTitle}>
												{this.props.data.name.text}
											</div>
											<div style={styles.eventDate}>
												{startDateTime}
											</div>
										</div>
									</Col>
								</Row>
								<hr style={{margin:0}} />
								<Row>
									<div style={{padding:"5px 25px"}}>
										<div style={styles.descriptionBody} >
											{ellipsedText}
										</div>
									</div>
								</Row>
							</Col>
						</Row>
	    			</Paper>
				</a>
			</div>
		);
	}
}

export default EventThumbView;