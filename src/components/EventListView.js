import React from 'react';
import DataContainer from './DataContainer';
import EventThumbView from './EventThumbView';

class EventListView extends React.PureComponent
{

    static propTypes = {
        aditionalUsers: React.PropTypes.array,
        pastEvents: React.PropTypes.bool,
        nextEvents: React.PropTypes.bool
    };

    static defaultProps = {
        aditionalUsers: [],
        pastEvents: false,
        nextEvents: true
    };

    processFBEventsForMerging(fbEvents) {

    	if(!fbEvents || fbEvents == null || fbEvents.length <= 0)
    		return [];

    	var mergingEvents = [];

		fbEvents.forEach(function(event) {

			const dateToFormat = new Date(event.start_time);

			var ev = {
				id: event.id,
				description: {
					text: event.description,
					html: event.description
				},
				name: {
					text: event.name,
					html: event.name
				},
				start: {
					utc: event.start_time
				},
				raw: event,
				fbEvent: true
			}
			mergingEvents.push(ev);
		});

    	return mergingEvents;
    }

    processEventsForPresentation(events) {

    	let that = this;

    	if(!events || events.length <= 0)
    		return events;


		events = events.filter(function(event) {
			var today = new Date(Date.now());
			var yesterday = today.setDate(today.getDate() - 1);

			//past events
			if(that.props.pastEvents && !that.props.nextEvents) 
				return (new Date(event.start.utc)) <= yesterday;

			//future events
			if(!that.props.pastEvents && that.props.nextEvents) 
				return (new Date(event.start.utc)) > yesterday;

			//all events
			if(that.props.pastEvents && that.props.nextEvents)
				return true;

			//no events
			if(!that.props.pastEvents && !that.props.nextEvents)
				return false;

		});

		events = events.filter(function(event, i, a) {

			//always prioritize eventbrite events since they will contain
			//a register link which is more helpful than the fb events.
			if(!event.fbEvent)
				return true;

			for(var j = 0; j < a.length; j++) {
				if(j === i)
					continue;

				if(a[j].name.text === event.name.text)
					return false;
			}
			return true;
		})

		events = events.sort(function(a, b) {
			var dateA = new Date(a.start.utc);
			var dateB = new Date(b.start.utc);

			//future events
			//show earliest first
			if(!that.props.pastEvents && that.props.nextEvents) 
				return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;

			return (dateA < dateB) ? 1 : (dateA > dateB) ? -1 : 0;
		});

		return events;
    }

	render() {

		let that = this;

		return(


			<DataContainer action="api/v1/GetEventbriteEvents" 
				parameters={[
					{id:"additionalUsers", value: this.props.aditionalUsers}
				]}
				resultRender={function(data) {

					return (

						<DataContainer action="api/v1/GetFacebookEvents" 
							resultRender={function(fbdata) {

								var processedFbEvents = [];
								if(fbdata.events && fbdata.events.data)
									processedFbEvents = that.processFBEventsForMerging(fbdata.events.data);

								var mergedEvents = data.events.concat(processedFbEvents);

								//console.log(fbdata.events.data);
								//console.log(mergedEvents);

								data.events = that.processEventsForPresentation(mergedEvents);

								//console.log(data.events);

								return (

									<div>
						      			{data.events.length > 0 &&
											data.events.map(function(event, i) {
												return (
													<EventThumbView key={i} data={event} match={that.props.match}/>
												);
											})
										}

						      			{data.events.length <= 0 &&
						      				<div style={{
						      					fontSize: '26px',
						      					textAlign: 'center',
						      					padding: 30,
						      				}}>
						      					There are currently no events to show. Please check again later.
						      				</div>
										}
									</div>
								);
							}
						} />
					);
				}
			}>
			</DataContainer>
		);
	}
}


export default EventListView;