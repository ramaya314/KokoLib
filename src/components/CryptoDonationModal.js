import React from 'react';
import {Image, Col, Row, OverlayTrigger, Tooltip,
	//Modal, 
	Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Modal from './modal-shim';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Snackbar from 'material-ui/Snackbar';



class CryptoDonationModal extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            copiedToClipboard: false
        }
    } 

    static propTypes = {
        qrCode: PropTypes.string,
        address: PropTypes.string,
        name: PropTypes.string,
        show: PropTypes.bool
    };

    static defaultProps = {
        qrCode: PropTypes.string,
        address: "(missing)",
        name: "crypto",
        show:false
    };

	getStyles() {
		const styles = {
			icon : {
				width: "100%",
				maxWidth: 200
			},
			heading: {
				textAlign: "center"
			},
			address: {
				fontWeight: "bold",
				fontSize: "1.1em",
				display:'inline-block'
			},
			coinicon: {
				width:25,
				paddingRight: 5,
				verticalAlign: "middle"
			},
			copyClipboardButton: {
				display: 'inline-block',
				fontFamily: 'FontAwesome',
				fontSize: '1.25em',
				textDecoration: 'none',
				fontStyle: 'normal',
				fontWeight: 'normal',
				lineHeight: 1,
				WebkitFontSmoothing: 'antialiased',
				MozOsxFontSmoothing: 'grayscale',
				paddingLeft: 7
			}
		};
		return styles;
	}

	onAddressCopy = () => {
		this.setState({copiedToClipboard: true});

	};

	handleRequestClose = () => {
		this.setState({copiedToClipboard: false});
	};

	render() {

		const styles = this.getStyles();

		return(
			<div>
				<Modal show={this.props.show} onHide={this.props.onHide}  aria-labelledby="contained-modal-title-sm">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-sm">

							<Image src={this.props.icon} 
			                    style={styles.coinicon} />

		                    <div style={{display: 'inline-block', verticalAlign: "middle"}} >
								Donate {this.props.name}
							</div>

						</Modal.Title>
					</Modal.Header>
					<Modal.Body style={{textAlign:"center"}}>

						<Image src={this.props.qrCode} 
							style={styles.icon} />

						<div>
							<div style={styles.address} >
								{this.props.address}
							</div>

							<CopyToClipboard text={this.props.address}
								onCopy={this.onAddressCopy}>


							    <OverlayTrigger placement="top" overlay={
							    	<Tooltip id="tooltip"><strong>Copy to clipboard.</strong></Tooltip>
							    }>
									<div style={styles.copyClipboardButton} className="fa-clipboard"/>
							    </OverlayTrigger>

							</CopyToClipboard>


						</div>

						<div>
						Sending tokens to this address other than {this.props.coin} will result in your funds being lost.
						</div>

					</Modal.Body>
				</Modal>

				<Snackbar open={this.state.copiedToClipboard}
					message="Address copied to clipboard."
					autoHideDuration={2000}
					onRequestClose={this.handleRequestClose} />
				
			</div>
		);
	}
}

export default CryptoDonationModal;