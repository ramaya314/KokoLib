import React from 'react';
import DataContainer from './DataContainer';
import EventThumbView from './EventThumbView';
import Utils from '../Utils';
import PropTypes from 'prop-types';

class EventListView extends React.PureComponent
{

    static propTypes = {
        aditionalUsers: PropTypes.array,
        pastEvents: PropTypes.bool,
        nextEvents: PropTypes.bool,
        maxResults: PropTypes.number,
        targetPageRoot: PropTypes.string
    };

    static defaultProps = {
        aditionalUsers: [],
        pastEvents: false,
        nextEvents: true,
        maxResults: -1,
        targetPageRoot: ""
    };

    processFBEventsForMerging(fbEvents) {

    	if(!fbEvents || fbEvents == null || fbEvents.length <= 0)
    		return [];

    	var mergingEvents = [];

    	let that = this;

		fbEvents.forEach(function(event) {

			const dateToFormat = Utils.getValidDate(event.start_time);

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

    	console.log(events);

		events = events.filter(function(event) {
			var today = new Date(Date.now());
			var yesterdayCompareDate = new Date(Date.now());
			var yesterday = yesterdayCompareDate.setDate(yesterdayCompareDate.getDate() - 1);


console.log("1");
			var startDate = Utils.getValidDate(event.start.utc);

      console.log("1");
			//past events
			if(that.props.pastEvents && !that.props.nextEvents)
				return (startDate) <= yesterday || (event.status && event.status == "canceled");

			//future events
			if(!that.props.pastEvents && that.props.nextEvents)
				return (startDate) > today && (!event.status || (event.status && event.status != "canceled"));

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
		});


		events = events.sort(function(a, b) {
			var dateA = Utils.getValidDate(a.start.utc);
			var dateB = Utils.getValidDate(b.start.utc);

			//future events
			//show earliest first
			if(!that.props.pastEvents && that.props.nextEvents)
				return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;

			return (dateA < dateB) ? 1 : (dateA > dateB) ? -1 : 0;
		});


		return events;
    }

  renderMergedEvents = (events) => {

    let that = this;

		events = that.processEventsForPresentation(events);


		if(that.props.maxResults > 0 && events && events.length > 0) {
			events = events.slice(0, that.props.maxResults);
		}

		return (

			<div>
      			{events.length > 0 &&
					events.map(function(event, i) {

						//return <div key={i} style={{ background:"red", width:100, height:100, padding:30}} />

						return (
              <div  style={{marginBottom:15}}>
							   <EventThumbView key={i} data={event} match={that.props.match} targetPageRoot={that.props.targetPageRoot} />
              </div>
						);
					})
				}

      			{events.length <= 0 &&
      				<div>
						<div dangerouslySetInnerHTML={{
						__html: `
							<style>
								.ghostEventList { display:none;}
							</style>
							`
						}} />
	      				<div style={{
	      					fontSize: '26px',
	      					textAlign: 'center',
	      					padding: 30,
	      				}}>
	      					There are currently no events to show. Please check again later.
	      				</div>
      				</div>
				}
			</div>
		);
  }

	render() {

		let that = this;

		return(


			<DataContainer action="api/v1/GetEventbriteEvents"
				parameters={[
					{id:"additionalUsers", value: this.props.aditionalUsers}
				]}
				resultRender={function(data) {
          //console.log(data);

					return (

						<DataContainer action="api/v1/GetFacebookEvents"
							resultRender={function(fbdata) {

								console.log(fbdata);

								var processedFbEvents = [];
								if(fbdata.events && fbdata.events.data)
									processedFbEvents = that.processFBEventsForMerging(fbdata.events.data);


								var mergedEvents = data.events.concat(processedFbEvents);

                return that.renderMergedEvents(mergedEvents);
							}} errorRender={function(error) {
                console.log(error);
                return that.renderMergedEvents(data.events);
              }}
					 />
					);
				}
			}>
			</DataContainer>
		);
	}
}


export default EventListView;
