import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class TwitterContainer extends React.PureComponent {

  static propTypes = {
    widgetId: PropTypes.string,
    user: PropTypes.string,
    chrome: PropTypes.string,
    limit: PropTypes.number,
  }

  render() {
    return(
        <a className="twitter-timeline"
          href={`https://twitter.com/${this.props.user}`}
          data-widget-id={this.props.widgetId}
          data-chrome={this.props.chrome}
          data-tweet-limit={this.props.limit}
        />
    );
  }
}

class TwitterTimeline extends React.PureComponent {

  static propTypes = {
    widgetId: PropTypes.string,
    user: PropTypes.string,
    chrome: PropTypes.string,
    limit: PropTypes.number,
  }

  componentDidMount() {
      const twittertimeline = ReactDOM.findDOMNode(this.twittertimeline);
      const twitterscript = document.createElement('script');
      twitterscript.src = '//platform.twitter.com/widgets.js';
      twitterscript.async = true;
      twitterscript.id = 'twitter-wjs';
      twittertimeline.parentNode.appendChild(twitterscript);
  }

  render() {
    const { user, widgetId, chrome, limit } = this.props;
    return (
      <div style={{background: "#fff"}} >
        <TwitterContainer {...this.props} ref={(container) => { this.twittertimeline = container; }} />
      </div>
    );
  }
}

export default TwitterTimeline
