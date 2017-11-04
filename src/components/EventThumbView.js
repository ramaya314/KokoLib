import React from 'react';
import {Image, Col, Row} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import dateFormat from 'dateformat';
import DataContainer from './DataContainer';
import moment from 'moment';

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

    getValidDate(dateString, utc) {
    	if(utc)
	    	return new Date(moment.utc(dateString).valueOf());
	    else 
	    	return new Date(moment(dateString).valueOf());

    }

	render() {

		const styles = this.getStyles();

		var ellipsedText = "";
		if(this.props.data.description.text && this.props.data.description.text.length > 0)
			ellipsedText = (this.props.data.description.text).substring(0,200) + "...";

		var startDateTime = dateFormat(this.getValidDate(this.props.data.start.utc), "dddd, mmmm dS, yyyy");

		//console.log(this.props.data);

		var linkUrl = `${this.props.match.url}/`;
		
		if(this.props.data.fbEvent)
			linkUrl += "fb";

		linkUrl += this.props.data.id;

		return(
			<div>
				<a  href={linkUrl} >
	    			<Paper style={styles.paperStyle} zDepth={3} >
						{false && 
							<pre>{JSON.stringify(this.props.data, null, 4) }</pre>
						}
						<Row>

							<Col xs={12} sm={4} md={4} lg={2} >
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
							<Col xs={12} sm={8} md={8} lg={10}>
								<div style={{padding:10}}>
									<div style={styles.eventTitle}>
										{this.props.data.name.text}
									</div>
									<div style={styles.eventDate}>
										{startDateTime}
									</div>
									<hr />
									<div style={styles.descriptionBody} >
										{ellipsedText}
									</div>
								</div>
							</Col>
						</Row>
	    			</Paper>
				</a>
			</div>
		);
	}
}

export default EventThumbView;