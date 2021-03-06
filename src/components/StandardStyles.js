import React from 'react';
import { withTheme } from '@material-ui/core/styles';

class StandardStyles extends React.PureComponent
{
	render() {

		let palette = this.props.theme.palette;

		return(
			<div dangerouslySetInnerHTML={{
			__html: `
				<style>
					body
					{
						background-color: ${palette.primary1Color};
						margin: 0;
						padding: 0;
					}
					a
					{
						color: ${palette.anchorColor || palette.primary3Color};
						text-decoration: none;
						word-wrap: break-word;
					}
					a *:hover {

						text-decoration: none !important;
					}

					h1
					{
						color: ${palette.primary2Color};
						font-weight: 500;
						border-bottom: 2px solid ${palette.accent1Color};
						font-family: ${palette.headerFontFamily};
					}

					/*========= BOOTSTRAP BUTTONS ==================*/
					.btn-primary
					{
						color: ${palette.alternateTextColor};
					    background-color: ${palette.primary2Color};
					    border: none;
					}

					.btn-primary:hover,
					.btn-primary:active,
					.btn-primary:active:focus,
					.btn-primary:focus,
					.btn-primary.active
					{
					    background-color: ${palette.accent1Color};
					}

					/* styles to make react tables smaller on phones*/
					@media all and (max-width: 599px)   and (orientation : portrait), (max-width: 899px)  and (orientation : landscape)
					{
						.reactTableContainer
						{
							min-width:400px !important;
							font-size: 0.6em;

						}
						.kokolib_event_thumbview > div {
							margin:0px !important;
						}
					}
					.reactTableContainer
					{
						min-width: 0 !important;
					}


					/*========== NAVBAR STYLES ============*/

					.nav-pills>li>a {
					    color: ${palette.primary2Color};
					}
					.nav-pills>li.active>a {
					    background-color: ${palette.primary2Color};
					}
					.nav-pills>li.active>a:hover {
					    background-color: ${palette.primary2Color};
					}

					.icon:before {
						display: inline-block;
						font-family: FontAwesome;
						font-size: 1.25em;
						text-decoration: none;
						font-style: normal;
						font-weight: normal;
						line-height: 1;
						-webkit-font-smoothing: antialiased;
						-moz-osx-font-smoothing: grayscale;
					}

				</style>
				`
			}} />
		);
	}
}

export default withTheme()(StandardStyles);
