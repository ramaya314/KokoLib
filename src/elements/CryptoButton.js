import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Utils from '../Utils';
import PropTypes from 'prop-types';
import {Image} from 'react-bootstrap';
import CryptoDonationModal from '../components/CryptoDonationModal';

class CryptoButton extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            showModal: false
        }
    }

    static propTypes = {
    	name: PropTypes.string,
        icon: PropTypes.string,
        address: PropTypes.string,
        qrCode: PropTypes.string
    };

    static defaultProps = {
    	name: 'crypto',
        icon: 'envelope',
        address: 'asdasdasdasdasdas',
        qrCode: 'Email',
    };

	getStyles() {

    let palette = this.props.theme.palette;
		const styles = {
			container: {
				listStyle: 'none',
				display: 'inline-block',
			},
			link: {
				display: 'inline-block',
				background: 'none',
				width: '2.5em',
				height: '2.5em',
				lineHeight: '2.5em',
				textAlign: 'center',
				borderRadius: '100%',
				cursor:'pointer',
				border: 0,
				color: palette.textColor,
			},
			icon: {
				width:30
			}
		}
		return styles;
	}

    onHoverEnter = () => {
        this.setState({
            focused: true
        });
    };

    onHoverLeave = () => {
        this.setState({
            focused: false
        });
    };

	render() {

		var styles = this.getStyles();

        const componentClasses = ['kokoLib_cryptoIcon'];
        if (this.state.focused) { componentClasses.push('focused'); }

		return(

				<li style={styles.container}>
					<div dangerouslySetInnerHTML={{
					__html: `
						<style>
							.kokoLib_cryptoIcon {
								-webkit-transition: 0.6s;
								-moz-transition: 0.6s;
								-o-transition: 0.6s;
								transition: 0.6s;
							}

							.kokoLib_cryptoIcon.focused {
								transform:scale(1.1) !important;
							}

						</style>
						`
					}} />
					<a onClick={() => this.setState({ showModal: true })}
						style={styles.link} >
						<div className={componentClasses.join(' ')} >
							<Image src={this.props.icon}
								onMouseEnter={this.onHoverEnter}
			                    onMouseLeave={this.onHoverLeave}
			                    style={styles.icon} />
		                </div>
					</a>

        			<CryptoDonationModal  {...this.props} show={this.state.showModal}
        				onHide={() => this.setState({ showModal: false })}  />
				</li>
		);
	}
}


export default withTheme()(CryptoButton);
