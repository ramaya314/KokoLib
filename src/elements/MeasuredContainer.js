import React from 'react';
import PropTypes from 'prop-types';

import Dimensions from 'react-dimensions';

class MeasuredContainer extends React.PureComponent
{
	render() {

        return(
            <div style={{width: '100%',height:'100%'}}>
                {React.cloneElement(this.props.children, {...this.props})}
            </div>
		);
	}
}


export default Dimensions()(MeasuredContainer);
