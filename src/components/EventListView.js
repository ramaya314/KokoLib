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

	render() {

		let that = this;

		return(


			<DataContainer action="api/v1/GetEventbriteEvents" 
				parameters={[
					{id:"additionalUsers", value: this.props.aditionalUsers}
				]}
				resultRender={function(data) {

					data.events = data.events.filter(function(event) {
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

					data.events = data.events.sort(function(a, b) {
						var dateA = new Date(a.start.utc);
						var dateB = new Date(b.start.utc);
						return (dateA < dateB) ? 1 : (dateA > dateB) ? -1 : 0;
					});

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
			      					fontSize: '26',
			      					textAlign: 'center',
			      					padding: 30,
			      				}}>
			      					There are currently no events to show. Please check again later.
			      				</div>
							}
						</div>
					);
			}}>
			</DataContainer>
		);
	}
}


export default EventListView;