import React from 'react';

class Spacer extends React.PureComponent
{
	render() {
		return(
			<div style={{marginTop: this.props.space}} />
		);
	}
}
export default Spacer;