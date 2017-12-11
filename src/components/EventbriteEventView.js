import React from 'react';

import {Image, Grid, Col, Row, Button } from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';


class EventbriteEventView extends React.PureComponent
{

    static propTypes = {
        data: PropTypes.object
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

	render() {

		const styles = this.getStyles();

		var data = this.props.data;

		let startDate = dateFormat(new Date(data.start.local), "dddd, mmmm dS, yyyy");
		let startDateTime = dateFormat(new Date(data.start.utc), "h:MM:ss TT");
		let endDateTime = dateFormat(new Date(data.end.utc), "h:MM:ss TT Z");

		let metaDescription = data.description.text.length > 170 ? data.description.text.substr(0, 160) + "..." : data.description.text;

		return (
			<Paper  style={styles.paperStyle} zDepth={3} >

				<MetaTags>
					<title>{data.name.text}</title>
					<meta id="meta-description" name="description" content={metaDescription} />
					<meta id="og-title" property="og:title" content={data.name.text} />
					<meta id="og-image" property="og:image" content={data.logo.url} />
				</MetaTags>

				<Row>
					<Col xs={12} lg={4}>
						<Image src={data.logo.url} style={styles.logoStyle}/>
					</Col>
					<Col xs={12} lg={8}>
						<div style={{'padding' : '0px 20px'}}>
							<h1>
								{data.name.text}
							</h1>
							<p>by {data.organizer.name} </p>
						</div>

					</Col>

				</Row>



				<hr style={{margin:0}}/>

				<Row>

					<Col xs={12} sm={12} mdHidden={true} lgHidden={true} >

						<div style={{padding:20, paddingTop:0}} >
							<Row>
								<Col xs={12} sm={6}>
									<h2>
										<b>Date and Time</b>
									</h2>
									<p>
										<span>{startDate}</span>
										<br />
										<span>{startDateTime}</span>
										<span> - </span>
										<span>{endDateTime}</span>
									</p>
								</Col>
								<Col xs={12} sm={6}>
									<h2>
										<b>Location</b>
									</h2>
									<div>
										{data.venue.name}
									</div>
									{data.venue.address.localized_multi_line_address_display.map(function(line, i) {
										return(
											<div key={i}>
												{line}
											</div>
										);	
									})}
								</Col>
							</Row>
						</div>
					</Col>

					<Col xs={12} md={6} lg={8}>
						<div style={{padding:20, paddingTop:0}} >
							<h2>
								<b>Description</b>
							</h2>
							<p  dangerouslySetInnerHTML={{__html: data.description.html}} />
						</div>
					</Col>

					<Col xsHidden={true} smHidden={true} sm={12}  md={6} lg={4}>

						<div style={{padding:20, paddingTop:0}} >
							<h2>
								<b>Date and Time</b>
							</h2>
							<p>
								<span>{startDate}</span>
								<br />
								<span>{startDateTime}</span>
								<span> - </span>
								<span>{endDateTime}</span>
							</p>
							<hr />
							<h2>
								<b>Location</b>
							</h2>
							<div>
								{data.venue.name}
							</div>
							{data.venue.address.localized_multi_line_address_display.map(function(line, i) {
								return(
									<div key={i}>
										{line}
									</div>
								);	
							})}
						</div>

					</Col>
				</Row>

				{data.status !== 'completed' &&
					<div>
	    				<hr style={{margin:0}}/>

						<Row>
							<Col xs={12} sm={12} md={6} lg={8}>
							</Col>
							<Col xs={12} sm={12} md={6} lg={4}>
								<div style={{padding:20}}>
									<Button  bsStyle="primary" bsSize="large" block onClick={() => {
										window.open(data.url + '#tickets', '_blank');	
									}}>Register</Button>
								</div>
							</Col>
						</Row>
					</div>
				}
			</Paper>
		);
	}
}


export default EventbriteEventView;