import React, { Component } from 'react';

class NewsLetterSignupForm extends Component {

	render(){
		return(
			<div>
				<link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
				<div id="mc_embed_signup">
					<form action="//wordpress.us8.list-manage.com/subscribe/post?u=59e7cc964813b1b18ed88a59e&amp;id=32b78d5a5b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate={true}>
					    <div id="mc_embed_signup_scroll">
						<h2>Subscribe to our newsletter</h2>
					<div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
					<div className="mc-field-group">
						<label htmlFor="mce-EMAIL">Email Address  <span className="asterisk">*</span>
					</label>
						<input type="email"  name="EMAIL" className="required email" id="mce-EMAIL" />
					</div>
					<div className="mc-field-group">
						<label htmlFor="mce-FNAME">First Name </label>
						<input type="text"  name="FNAME" className="" id="mce-FNAME" />
					</div>
					<div className="mc-field-group">
						<label htmlFor="mce-LNAME">Last Name </label>
						<input type="text"  name="LNAME" className="" id="mce-LNAME" />
					</div>
					<div id="mce-responses" className="clear">
						<div className="response" id="mce-error-response" style={{display:'none'}} ></div>
						<div className="response" id="mce-success-response" style={{display:'none'}}></div>
					</div> 
				    <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_59e7cc964813b1b18ed88a59e_32b78d5a5b" tabIndex="-1" value="" /></div>
				    <div className="clear">
				    	<input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" />
				    	</div>
				    </div>
					</form>
				</div>
				<div dangerouslySetInnerHTML={{__html: "<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='MMERGE3';ftypes[3]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>"}} />
			</div>
			)
	}
}

export default NewsLetterSignupForm;