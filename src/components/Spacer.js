import React from 'react';

class Spacer extends React.PureComponent
{
	render() {
		return(
			<div style={{height: this.props.space}} />
		);
	}
}
export default Spacer;