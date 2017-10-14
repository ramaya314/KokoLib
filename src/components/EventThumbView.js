import React from 'react';
import {Image, Col, Row} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import dateFormat from 'dateformat';

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

		var startDateTime = dateFormat(new Date(this.props.data.start.local), "dddd, mmmm dS, yyyy");
		return(
			<div>
				<a  href={`${this.props.match.url}/${this.props.data.id}`} >
	    			<Paper style={styles.paperStyle} zDepth={3} >
						{false && 
							<pre>{JSON.stringify(this.props.data, null, 4) }</pre>
						}
						<Row>

							{this.props.data.logo &&
								<Col xs={12} md={6} lg={4}>
										<Image src={this.props.data.logo.url} style={styles.logoStyle}/>
								</Col>
							}
							<Col xs={12} md={6} lg={8}>
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