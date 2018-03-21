import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import BlogArchive from '../components/BlogArchive';
import DataContainer from '../components/DataContainer';


class BlogArchiveContainer extends Component {

	constructor(...args) {
		super(...args);

		this.state = {
			gettingOlder: false
		};
	}

	componentWillMount() {

		//we got existing data, use that
		if(this.props.data && this.props.data.length > 0) {
			if(this.props.activePostId && this.props.activePostId.length > 0) {
				for(var i = 0; i < this.props.data.length; i++) {
					if(this.props.data[i].id === this.props.activePostId) {
						this.props.onSelectPost(this.props.data[i]);
						break;
					}
				}
			}
		} else { //try to get data from the server
			let dc = new DataContainer();
			let that = this;
			dc.GET("api/v1/GetBlog", null, function(data){
				if(data && data != null && data.items && data.items != null && data.items.length > 0) {

					that.props.onUpdateArchive(data.items);
					that.props.onNextPageTokenUpdate(data.nextPageToken);

					if(that.props.activePostId && that.props.activePostId.length > 0) {

						for(var i = 0; i < data.items.length; i++) {
							if(data.items[i].id === that.props.activePostId) {
								that.props.onSelectPost(data.items[i]);
								break;
							}
						}
					} else {
						that.props.onSelectPost(data.items[0]);
					}
				}
			}, function(error) {
				console.log(error);
			})
		}
	}


	getOlderPosts = () => {
		this.setState({gettingOlder: true});
	}
	
	render() {
		let that = this;
		return (
			<div>
				<BlogArchive data={this.props.data} nextPageToken={this.props.nextPageToken} onGetOlderPosts={this.props.getOlderPosts} onSelectPost={(post) => {
					window.history.pushState(that.props.location.state, post.title, `${that.props.targetPageRoot}/${post.id}`);
					that.props.onSelectPost(post)
				}} />

				{this.state.gettingOlder && 

						<DataContainer action="/api/v1/GetBlog" 
							parameters={[
								{id:"pageToken", value: this.props.nextPageToken}
							]}
							resultRender={function(olderPostsData) {

								setTimeout(function() {

									console.log(olderPostsData.items);

									var joinedItems = that.props.data.concat(olderPostsData.items);

									//filter by unique
									joinedItems = Array.from(new Set(joinedItems));

									that.props.onUpdateArchive(joinedItems);
									that.props.onNextPageTokenUpdate(olderPostsData.nextPageToken || null);

									that.setState({gettingOlder:false});
								}, 10);

								return <div />;
						}} />
				}
				{!this.state.gettingOlder && this.props.nextPageToken &&
					<a onClick={this.getOlderPosts} style={{
						cursor:'pointer'
					}}> Older Posts</a>
				}

			</div>
		);
	} 
}



function mapStateToProps(state) {
	return({
		data: state.blogArchive,
		nextPageToken: state.blogNextPageToken
	})
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		onSelectPost: (post) => {
			return {
				type: "BLOG_POST_SELECTED",
				payload: post
			}
		}, onUpdateArchive: (archiveData) => {
			return {
				type: "BLOG_ARCHIVE_UPDATED",
				payload:archiveData
			}
		}, onNextPageTokenUpdate: (nextPageToken) => {
			return {
				type: "NEXT_PAGE_TOKEN_UPDATED",
				payload:nextPageToken
			}
		}}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(BlogArchiveContainer);
