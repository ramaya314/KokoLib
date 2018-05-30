import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

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

export default class ShareMenu  extends React.Component {

    static propTypes = {
      anchorEl: PropTypes.object,
      open: PropTypes.bool,
      onClose: PropTypes.func,
      shareUrl: PropTypes.string,
      title: PropTypes.string,
    };

    static defaultProps = {
      leaf: {},
      open: false,
      onClose: () => {},
      shareUrl: "",
      title: "",
    };


	render() {
		return(
      <Menu
        anchorEl={this.props.anchorEl}
        open={this.props.open}
        onClose={this.props.onClose} >
        <MenuItem onClick={this.onClose}>
            <FacebookShareButton
              url={this.props.shareUrl}
              quote={this.props.title}
              className="kokoLib_articles_FBButton_button">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
        </MenuItem>

        <MenuItem >
					<TwitterShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						className="kokoLib_articles_TWButton_button">
						<TwitterIcon size={32} round />
					</TwitterShareButton>
        </MenuItem>

        <MenuItem >
					<WhatsappShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						separator=":: "
						className="kokoLib_articles_WAButton_button">
						<WhatsappIcon size={32} round />
					</WhatsappShareButton>
        </MenuItem>

        <MenuItem >
					<GooglePlusShareButton
						url={this.props.shareUrl}
						className="kokoLib_articles_GPButton_button">
						<GooglePlusIcon size={32} round />
					</GooglePlusShareButton>
        </MenuItem>

        <MenuItem >
					<LinkedinShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						windowWidth={750}
						windowHeight={600}
						className="kokoLib_articles_LIButton_button">
						<LinkedinIcon size={32} round />
					</LinkedinShareButton>
        </MenuItem>

        <MenuItem >
					<RedditShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						windowWidth={660}
						windowHeight={460}
						className="kokoLib_articles_RDButton_button">
						<RedditIcon size={32} round />
					</RedditShareButton>
        </MenuItem>

        <MenuItem >
					<TumblrShareButton
						url={this.props.shareUrl}
						title={this.props.title}
						windowWidth={660}
						windowHeight={460}
						className="Demo__some-network__share-button">
						<TumblrIcon size={32} round />
					</TumblrShareButton>
        </MenuItem>
      </Menu>

		);
	}
}
