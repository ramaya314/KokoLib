import React from 'react';
import PropTypes from 'prop-types';

import Dimensions from 'react-dimensions';

import MeasuredContainer from '../elements/MeasuredContainer';
import DataContainer from './DataContainer';


class FacebookVideoStream extends React.PureComponent
{

    static propTypes = {
    	containerWidth: PropTypes.number,
        embedHtml: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.string
    };

    static defaultProps = {
        description: '',
        id: ''
    };

	getTargetWidth(frameHtml) {

		var delimiter = " width=";
		var widthString = frameHtml.substr(frameHtml.indexOf(delimiter) + delimiter.length);

		widthString = widthString.trim().substr(0, frameHtml.indexOf(" ") - 1);
		widthString = widthString.split("\"").join("").split("'").join("");


		return parseInt(widthString);
	}

	getTargetHeight(frameHtml) {

		var delimiter = " height=";
		var heightString = frameHtml.substr(frameHtml.indexOf(delimiter) + delimiter.length);
		heightString = heightString.substr(0, frameHtml.indexOf(" ") - 1);
		heightString = heightString.split("\"").join("").split("'").join("");
		return parseInt(heightString);
	}

	render() {

		var frameHtml = this.props.embedHtml;
		frameHtml = frameHtml.replace("<iframe", "<iframe class='facebookLiveStreamFrame'");

		var width = this.getTargetWidth(frameHtml);
		var height = this.getTargetHeight(frameHtml);
		var rate = width * 1.0 / height;
		var targetWidth = this.props.containerWidth;
		var targetHeight = parseInt(targetWidth / rate);

		return (
			<div>
				{this.props.description && this.props.description.length > 0 &&
					<h1>{this.props.description}</h1>
				}

				<div dangerouslySetInnerHTML={{
				__html: `
					<style>
						.facebookLiveStreamFrame{
							width:${targetWidth}px !important;
							height: ${targetHeight}px !important;
						}
					</style>
					`
				}} />
				<div dangerouslySetInnerHTML={{__html: frameHtml}} />
			</div>
		);
	}
}

export default Dimensions()(FacebookVideoStream);
