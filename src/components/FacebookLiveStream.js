import React from 'react';
import PropTypes from 'prop-types';

import DataContainer from './DataContainer';
import FacebookVideoStream from './FacebookVideoStream';
import Utils from '../Utils';

import PropTypes from 'prop-types';

class FacebookLiveStream extends React.PureComponent
{

    static propTypes = {
        daysToLive: PropTypes.number
    };

    static defaultProps = {
        daysToLive: 7
    };

	render() {

		let that = this;

        return(
				<DataContainer action="api/v1/GetFacebookLiveStream" 
					resultRender={function(data) {

						if(!data || !data.data || data.data.length <= 0) {
							return <div />;
						}
						var liveStreams = data.data.filter(function(stream) {

							//always allow live streams
							if(stream.status === 'LIVE')
								return true;

							var startDate = Utils.getValidDate(stream.broadcast_start_time);
							var cutoffDate = startDate.setDate(startDate.getDate() + that.props.daysToLive);
							var today = new Date(Date.now());

							return cutoffDate > today;
						});


						if(!liveStreams || liveStreams.length <= 0)
							return <div />;

						var selectedStream = liveStreams[0];


						return (
							<FacebookVideoStream id={selectedStream.id}
								embedHtml={selectedStream.embed_html}
								description={selectedStream.description} />
						);
				}}>
				</DataContainer>
		);
	}
}


export default FacebookLiveStream;
