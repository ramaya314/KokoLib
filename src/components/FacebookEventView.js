import React from 'react';

import {Image, Grid, Col, Row, Button } from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import dateFormat from 'dateformat';
import DataContainer from './DataContainer';
import moment from 'moment';

import {stateFromMarkdown} from 'draft-js-import-markdown';
import {stateToHTML} from 'draft-js-export-html';

class FacebookEventAddressArea  extends React.PureComponent {

	render() {
		return (

			<div style={{padding:20, paddingTop:0}} >
				<Row>
					<Col xs={12} sm={this.props.place ? 6 : 12}>
						<h2>
							<b>Date and Time</b>
						</h2>
						<p>
							<span>{this.props.startDate}</span>
							<br />
							<span>{this.props.startDateTime}</span>
							<span> - </span>
							<span>{this.props.endDateTime}</span>
						</p>
					</Col>
					{this.props.place && 
						<Col xs={12} sm={6}>
							<h2>
								<b>Location</b>
							</h2>
							{this.props.place.name &&
								<div>
									{this.props.place.name}
								</div>
							}
							{this.props.place.street &&
								<div>
									{this.props.place.street}
								</div>
							}
							<div>
								{this.props.place.city && this.props.place.city + " "}
								{this.props.place.state && this.props.place.state + " "}
								{this.props.place.zip && ", " + this.props.place.zip}
							</div>
						</Col>
					}
				</Row>
			</div>
		);
	}
}

class FacebookEventView extends React.PureComponent
{

	constructor(props) {
		super(props);
		this.state = {
			description : "",
		}
	}   

    static propTypes = {
        data: React.PropTypes.object
    };

    static defaultProps = {
        data: {}
    };

	getStyles() {
		const styles = {
			paperStyle : {
				margin: 0,
			},
			logoStyle: {
				width: '100%',
			},
		};
		return styles;
	}

    getValidDate(dateString, utc) {
    	if(utc)
	    	return new Date(moment.utc(dateString).valueOf());
	    else 
	    	return new Date(moment(dateString).valueOf());
    }

	linkify(inputText) {
		var replacedText, replacePattern1, replacePattern2, replacePattern3;

		//URLs starting with http://, https://, or ftp://
		replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

		//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

		//Change email addresses to mailto:: links.
		replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
		replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

		return replacedText;
	}

	render() {

		const styles = this.getStyles();

		var data = this.props.data;

		let startDate = dateFormat(this.getValidDate(data.start_time), "dddd, mmmm dS, yyyy");
		let startDateTime = dateFormat(this.getValidDate(data.start_time), "h:MM:ss TT");
		let endDateTime = dateFormat(this.getValidDate(data.end_time), "h:MM:ss TT Z");
		let description = data.description;
		let contentState = stateFromMarkdown(description);
		let descriptionHtml = stateToHTML(contentState);
		descriptionHtml = this.linkify(descriptionHtml);

		return (
			<Paper  style={styles.paperStyle} zDepth={3} >

				<Row>
					<Col xs={12} sm={6} md={4} lg={3}>
						<DataContainer action="/api/v1/GetFacebookEventPicture" 
							parameters={[
								{id:"eventId", value: data.id}
							]}
							resultRender={function(pictureData) {
								return (
									<Image src={pictureData.location} style={styles.logoStyle}/>
								);
						}} />
					</Col>
					<Col xs={12} sm={6} md={8} lg={9}>
						<div style={{'padding' : '0px 20px'}}>
							<h1>
								{data.name}
							</h1>
						</div>

						<Row>
							<Col xsHidden={true} smHidden={true}>
								<FacebookEventAddressArea startDate={startDate}
									startDateTime={startDateTime}
									endDateTime={endDateTime}
									place={data.place} />
							</Col>
						</Row>

					</Col>

				</Row>



				<hr style={{margin:0}}/>

				<Row>

					<Col xs={12} sm={12} mdHidden={true} lgHidden={true} >
						<FacebookEventAddressArea startDate={startDate}
							startDateTime={startDateTime}
							endDateTime={endDateTime}
							place={data.place} />
					</Col>

					<Col xs={12} md={12} lg={12}>
						<div style={{padding:20, paddingTop:0}} >
							<h2>
								<b>Description</b>
							</h2>
							<div  dangerouslySetInnerHTML={{__html: descriptionHtml}} />
						</div>
					</Col>

				</Row>

			</Paper>
		);
	}
}


export default FacebookEventView;