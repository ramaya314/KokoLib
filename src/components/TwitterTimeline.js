import React, {PropTypes } from 'react';
import ReactDOM from 'react-dom';

class TwitterTimeline extends React.Component {

  componentDidMount() {
      const twittertimeline = ReactDOM.findDOMNode(this.refs.twittertimeline);
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
        <a
          ref="twittertimeline"
          className="twitter-timeline"
          href={`https://twitter.com/${user}`}
          data-widget-id={widgetId}
          data-chrome={chrome}
          data-tweet-limit={limit}
        />
      </div>
    );
  }
}

TwitterTimeline.propTypes = {
    widgetId: PropTypes.string,
    user: PropTypes.string,
    chrome: PropTypes.string,
    limit: PropTypes.number,
}

export default TwitterTimeline