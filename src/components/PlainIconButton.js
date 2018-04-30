import React, { PureComponent } from 'react';

import { withTheme } from 'material-ui/styles';

import PropTypes from 'prop-types';

class PlainIconButton extends PureComponent {

    static propTypes = {
        content: PropTypes.string,
        link: PropTypes.string,
        iconContent: PropTypes.string
    };

    static defaultProps = {
        content: "",
        link: "",
        iconContent: "\f190"
    };

	getStyles() {

		let palette = this.props.muiTheme.palette;
		const styles = {

			container : {
				color: palette.primary1Color,
				fontSize: '26px',
				fontWeight: '600',
				margin: 10,
			    verticalAlign: 'bottom',
			    padding: '8px 22% 9px 15px',
			    display: 'table',
			    textDecoration: 'none',
			    ':hover': {
			    	color: palette.accent1Color + ' !important',
			    }
			},
			content : {
				display: 'table-cell',
				verticalAlign: 'bottom',
				color: palette.primary1Color,
			    ':hover': {
			    	color: palette.accent1Color +' !important',
			    }
			},
		};
		return styles;
	}



	render() {
		const styles = this.getStyles();

		return (
			<div>
				<div dangerouslySetInnerHTML={{
				__html: `
					<style>
						.kokolib_plainIconButton::before {
							display: inline-block;
							font-family: FontAwesome;
							font-feature-settings: normal;
							font-kerning: auto;
							font-language-override: normal;
							font-size: inherit;
							font-size-adjust: none;
							font-stretch: normal;
							font-style: normal;
							font-synthesis: weight style;
							font-variant: normal;
							font-weight: normal;
							line-height: 1;
							text-rendering: auto;
							transform: translate(0px, 0px);
							content: "${this.props.iconContent}";
							padding-right: 8px;
							font-size: 30px !important;
						}

					</style>
					`
				}} />

				<a href={this.props.link} style={styles.container} className="kokolib_plainIconButton">
					<span style={styles.content}>{this.props.content}</span>
				</a>
			</div>
		);
	}
}

export default withTheme()(PlainIconButton);
