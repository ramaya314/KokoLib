import React from 'react';

import MetaTags from 'react-meta-tags';
import DataContainer from './DataContainer';

import {Image, Grid, Col, Row, Button } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import dateFormat from 'dateformat';

import EventbriteEventView from './EventbriteEventView';
import FacebookEventView from './FacebookEventView';

import PropTypes from 'prop-types';

class EventFullView extends React.PureComponent
{

    static propTypes = {
        eventId: PropTypes.string
    };

    static defaultProps = {
        eventId: ""
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

		var restCall = "/api/v1/GetSingleEventbriteEvent";
		var cleanId = this.props.eventId;
		var fbEvent = false;
		if(cleanId.startsWith("fb")) {
			cleanId = cleanId.replace("fb", "");
			restCall = "/api/v1/GetSingleFacebookEvent";
			fbEvent = true;
		}

		return(
			<DataContainer action={restCall}
				parameters={[{id:"eventId", value: cleanId}]}
				resultRender={function(data) {

					if(fbEvent)
						return <FacebookEventView data={data} />
					else
						return <EventbriteEventView data={data} />

			}}>
			</DataContainer>
		);
	}
}


export default EventFullView;
