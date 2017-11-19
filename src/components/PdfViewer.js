import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import ReactPDF from 'react-pdf';

class PdfViewer extends PureComponent {

    static propTypes = {
        rotate: PropTypes.number,
        file: PropTypes.string,
        width: PropTypes.number
    };

    static defaultProps = {
        rotate: 0,
        file: "",
        width: 100,
    };

	render() {
		return <div />
		/*
		return(
            <ReactPDF
            	rotate={this.props.rotate}
                file={this.props.file}
                width={this.props.width}
            />
		);
		*/
	}
}

export default PdfViewer;