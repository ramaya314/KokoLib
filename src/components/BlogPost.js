import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row} from 'react-bootstrap';
import dateFormat from 'dateformat';
import Spacer from './Spacer';
import DataContainer from './DataContainer';
import Utils from '../Utils';

import MetaTags from 'react-meta-tags';

import { StickyContainer, Sticky } from 'react-sticky';

import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,

  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,

  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
} from 'react-share';

class BlogPostShareButtons  extends React.Component {

	render() {
		return(
			<div className="kokoLib_articles_SMButtons_Container">

				<div dangerouslySetInnerHTML={{
				__html: `
					<style>
						.kokoLib_articles_SMButtons_Container {
							float:right;
						}	
						.separator {
							clear:none !important;
						}
					</style>
					`
				}} />

				<div className="kokoLib_articles_button">
					<FacebookShareButton
						url={this.props.shareUrl}
						quote={this.props.title}
						className="kokoLib_articles_FBButton_button">
						<FacebookIcon size={32} round />
					</FacebookShareButton>
				</div>

				<div className="kokoLib_articles_button">
					<TwitterShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						className="kokoLib_articles_TWButton_button">
						<TwitterIcon size={32} round />
					</TwitterShareButton>
				</div>

				<div className="kokoLib_articles_button">
					<WhatsappShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						separator=":: "
						className="kokoLib_articles_WAButton_button">
						<WhatsappIcon size={32} round />
					</WhatsappShareButton>
				</div>

				<div className="kokoLib_articles_button">
					<GooglePlusShareButton
						url={this.props.shareUrl}
						className="kokoLib_articles_GPButton_button">
						<GooglePlusIcon size={32} round />
					</GooglePlusShareButton>
				</div>

				<div className="kokoLib_articles_button">
					<LinkedinShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						windowWidth={750}
						windowHeight={600}
						className="kokoLib_articles_LIButton_button">
						<LinkedinIcon size={32} round />
					</LinkedinShareButton>
				</div>

				<div className="kokoLib_articles_button">
					<RedditShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						windowWidth={660}
						windowHeight={460}
						className="kokoLib_articles_RDButton_button">
						<RedditIcon size={32} round />
					</RedditShareButton>
				</div>

				<div className="kokoLib_articles_button">
					<TumblrShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						windowWidth={660}
						windowHeight={460}
						className="Demo__some-network__share-button">
						<TumblrIcon size={32} round />
					</TumblrShareButton>
				</div>

				{/*}
				<div className="kokoLib_articles_button">
					<EmailShareButton
					url={shareUrl}
					subject={this.props.data.title}
					body={this.props.data.content}
					className="Demo__some-network__share-button">
						<EmailIcon size={32} round />
					</EmailShareButton>
				</div>
				*/}

			</div>
		);
	}
}


class BlogPost extends React.Component
{
	getStyles() {
		const styles = {
			paperStyle : {
				margin: 0,
				padding: 15,
			},
			stickyHeader: {
				top:60,
    			zIndex: 999,
			},
		}
		return styles;
	}

	render() {


		let that = this;

		if(!this.props.data || this.props.data === null)
			return <div />

    	const styles = this.getStyles();

    	var createdDate = dateFormat(new Date(this.props.data.published), "mmmm dd, yyyy");

    	var fullMetaDescription = Utils.stripHtml(this.props.data.content).trim().replace(/(\r\n|\n|\r)/gm, "");
    	var metaDescription = fullMetaDescription;
    	if(metaDescription.length > 300)
    		metaDescription = metaDescription.substr(295) + "...";

    	//console.log(metaDescription);

    	var metaImageSource = Utils.getFirstImageSourceFromHtml(this.props.data.content);



    	var shareUrl = "";
    	if(window && window.location && window.location.href) {

    		console.log(window.location);

    		if(this.props.targetPageRoot && this.props.targetPageRoot.length > 0) {
    			shareUrl = `${window.location.protocol}//${window.location.host}/${this.props.targetPageRoot}`
    		} else {
		    	shareUrl = window.location.href;
    		}

	    	if(shareUrl.indexOf(this.props.data.id) < 0)
	    		shareUrl = `${shareUrl}/${this.props.data.id}`;

	    	//fix double slashes and then fix the inevitable single slash on the protocol
    		shareUrl = shareUrl.split("//").join("/").split("\\\\").join("\\").replace(":/", "://");

    		console.log(shareUrl);

    	}

		return(
			<Paper  style={styles.paperStyle} zDepth={3} >
				<Row>
					<Col xs={12}>
						<MetaTags>
							<meta id="ogTitle" property="og:title" content={this.props.data.title} />
							<meta id="ogImage" property="og:image" content={metaImageSource} />
							<meta id="ogSecureImage" property="og:image:secure_url" content={metaImageSource} />
							<meta id="ogDescription" property="og:description" content={metaDescription} />
							<meta id="ogType"  property="og:type" content="article" />
						</MetaTags>
						<h1> {this.props.data.title}</h1>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						Posted on <b>{createdDate}</b> by <b>{this.props.data.author.displayName}</b>
					</Col>
				</Row>
				<Spacer space={25} />
				<Row>
					<Col xs={12}>
						<StickyContainer>
							<div style={{float:'right'}}>
								<Sticky topOffset={-50} bottomOffset={-300}>
									{
										({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => {
											return (
												<div style={{ ...style, ...styles.stickyHeader}}>
													<BlogPostShareButtons shareUrl={shareUrl} title={that.props.data.title} />
												</div>
											)
										}
									}
								</Sticky>
							</div>
							<div style={{paddingRight:32}}>
								<div  dangerouslySetInnerHTML={{__html: this.props.data.content}} />
							</div>
						</StickyContainer>
					</Col>
				</Row>
			</Paper>
		);
	}
}


export default BlogPost;