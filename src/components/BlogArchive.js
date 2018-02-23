import React, { Component } from 'react';
import Utils from '../Utils';

import {Nav, NavItem, Collapse} from 'react-bootstrap';

class BlogArchiveYearEntry extends Component {

	constructor(...args) {
		super(...args);

		this.state = {
			open: true
		};
	}

	getCount() {

		if(!this.props.months || this.props.months == null) 
			return 0;

		var count = 0;
		let that = this;
		Object.keys(this.props.months).map(function(month) {
			count += that.props.months[month].posts.length;
		});
		return count + "";
	}

	render() {
		let that = this;


		return(
			<div>
				<NavItem eventKey={this.props.index} 
					onClick={ ()=> this.setState({ open: !this.state.open })}>
					<span className={"icon fa-angle-" + (this.state.open ?"down" : "right")}></span>
					<span>  {this.props.year} ({this.getCount()})</span>
				</NavItem>

				<Collapse in={this.state.open}>
					<div>
						{Object.keys(this.props.months).map(function(month, i) {
							return(
								<div style={{paddingLeft:15}} key={i} >
									<BlogArchiveMonthEntry month={month} 
										posts={that.props.months[month]} 
										key={i} 
										onSelectPost={that.props.onSelectPost}
										index={i}/>
								</div>
							)
						})}
					</div>
				</Collapse>
			</div>
		);
	}
}

class BlogArchiveMonthEntry extends Component {

	constructor(...args) {
		super(...args);

		this.state = {
			open: true
		};
	}

	getCount() {

		if(!this.props.posts || this.props.posts == null) 
			return 0;

		return this.props.posts.posts.length + "";
	}

	render() {
		let that = this;


		let posts = this.props.posts.posts;

		return(
			<div>
				<NavItem eventKey={this.props.index} 
					onClick={ ()=> this.setState({ open: !this.state.open })}>
					<span className={"icon fa-angle-" + (this.state.open ?"down" : "right")}></span>
					<span>  {this.props.month} ({this.getCount()})</span>
				</NavItem>

				<Collapse in={this.state.open}>
					<div>

						{posts.map(function(post, i) {
							return(
								<div style={{paddingLeft:30, paddingBottom: 20}} key={i} >
									<BlogArchivePostEntry post={post} 
										
										onSelectPost={that.props.onSelectPost}
									index={i}/>
								</div>
							)
						})}
					</div>
				</Collapse>
			</div>
		);
	}
}


class BlogArchivePostEntry extends Component {
	render() {
		let that = this;

		return(
				<NavItem eventKey={this.props.index} 
					onClick={ ()=> that.props.onSelectPost(that.props.post)} >
					<div style={{textIndent: -15, fontSize: '1.1em'}}>
						<b>{this.props.post.title}</b>
					</div>
				</NavItem>

		);
	}
}

class BlogArchive extends Component {


	constructor(props) {
		super(props);
		this.state = {
			secondaryNavIsSticky: false,
			currentActiveYear: null
		}
	}   

	render() {

		var rawData = this.props.data;
		
		var pData = Utils.getBlogArchiveFromBlogData(rawData);

		if(pData === null) return <div />

		let that = this;

		let years = Object.keys(pData);
		years.sort(function(a, b) {
			return a < b;
		});

		return(
			<Nav bsStyle="pills" 
				stacked 
				activeKey={this.state.currentActiveYear} 
				className="stickySecondaryNav">

				{years.map(function(year, i) {
					return(
						<BlogArchiveYearEntry year={year} 
							months={pData[year]} 
							key={i} 
							index={i}
							onSelectPost={that.props.onSelectPost} />
					)
				})}

			</Nav>
		);
	}
}

export default BlogArchive;