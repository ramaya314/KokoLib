import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

class StandardStyles extends React.PureComponent
{
	render() {

		let palette = this.props.muiTheme.palette;

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
						color: ${palette.accent2Color};
						text-decoration: none;
						word-wrap: break-word;
					}

					h1 
					{
						color: ${palette.accent1Color};
						font-weight: 600;
						border-bottom: 2px solid ${palette.primary2Color};
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

				</style>
				`
			}} />
		);
	}
}

export default muiThemeable()(StandardStyles);