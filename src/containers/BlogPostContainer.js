import React, { Component } from 'react';
import {connect} from 'react-redux';

import BlogPost from '../components/BlogPost';

class BlogPostContainer extends Component {

	render() {
		return (
			<BlogPost data={this.props.data}/>
		);
	} 
}

function mapStateToProps(state) {
	return({
		data: state.activeBlogPost
	})
}

export default connect(mapStateToProps)(BlogPostContainer);
