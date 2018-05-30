import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import EnhancedTextField from './EnhancedTextField';
import DataContainer from './DataContainer';

import SwipeableViews from 'react-swipeable-views';

import Recaptcha from 'react-recaptcha';

import PropTypes from 'prop-types';


//recaptcha hooks
const captchaLoadCallback = () => {};
const verifyCaptchaCallback = (response) => {
	window.atVAl(true);
};

class ContactForm extends React.PureComponent
{

    static propTypes = {
        useRecaptcha: PropTypes.bool,
        recipientEmail: PropTypes.string,
    };

    static defaultProps = {
        useRecaptcha: null,
        recipientEmail: 'ricdamayar@gmail.com',
    };

	constructor(props) {
		super(props);
		this.state = {
			firstNameField : '',
			lastNameField : '',
			emailField : '',
			mailBodyField : '',
			errorDialogOpen : false,
			errorDialogText : '',
			currentView : 0,
			humanVerified : false,
		}
		this.validatingInputs = [];
	}

	componentWillMount() {
		window.atVAl = (verified) => {
			this.setState({humanVerified : verified});
		}
	}

	handleSubmitTap = () => {
		if(this.formIsValid()) {
			this.sendValidMail();
		} else {
			this.setState({
				errorDialogOpen: true,
				errorDialogText: 'Please fix the errors on the form.',
			});
		}
	}

	handleSendAnotherTap = () => {
		this.resetForm();
		this.setState({
			currentView: 0
		});
	}

	resetForm() {
		this.setState({
			firstNameField : '',
			lastNameField : '',
			emailField : '',
			mailBodyField : '',
			humanVerified: false
		});
	}


	sendValidMail() {

		let that = this;

		let subject = "Contact From " + this.state.firstNameField + ' ' + this.state.lastNameField;
		let dc = new DataContainer();
		let action = "/api/v1/SendMail";
		let parameters = [
			{id: "from", 		value: this.state.emailField},
			{id: "to", 			value: this.props.recipientEmail},
			{id: "subject", 	value: subject},
			{id: "mailBody", 	value: this.state.mailBodyField},
			{id: "firstName", 	value: this.state.firstNameField},
			{id: "lastName", 	value: this.state.lastNameField},
		];
		dc.GET("/api/v1/SendMail", parameters, function(data){
			that.setState({
				currentView: 1
			});
		}, function(error) {
			this.setState({
				errorDialogOpen: true,
				errorDialogText: 'Error: ' + error,
			});
		})
	}

	handleTextFieldChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
	}

	registerValidatingInput = (inputField) => {
    	this.validatingInputs.indexOf(inputField) < 0 && this.validatingInputs.push(inputField);
	}

	formIsValid() {
		var validForm = true;
		this.validatingInputs.forEach(function(input) {
			if(!input.fieldIsValid()){
				validForm = false;
			}
		});
		return validForm;
	}


	handleToggleErrorDialog = () => {
		this.setState(prevState => ({errorDialogOpen: !prevState.errorDialogOpen}));
	};

	render() {
		return(
      		<div>

				<SwipeableViews index={this.state.currentView}>
					<div style={{overflow:"hidden"}}>
					    <EnhancedTextField name="firstNameField"
					    	value={this.state.firstNameField}
					    	helperText="First Name"
					    	floatingLabelText="First Name"
					    	isRequired={true}
								fullWidth={true}
					    	requiredErrorText="Your name is required"
					    	onChange={this.handleTextFieldChange}
					    	onFormRegister={this.registerValidatingInput}/>

					    <EnhancedTextField name="lastNameField"
					    	value={this.state.lastNameField}
					    	helperText="Last Name"
					    	floatingLabelText="Last Name"
					    	isRequired={true}
								fullWidth={true}
					    	requiredErrorText="Your last name is required"
					    	onChange={this.handleTextFieldChange}
					    	onFormRegister={this.registerValidatingInput}/>

					    <EnhancedTextField name="emailField"
					    	value={this.state.emailField}
					    	helperText="Email"
					    	floatingLabelText="Email"
								fullWidth={true}
					    	isRequired={true}
					    	validationType="email"
					    	formatErrorText="Please enter a valid email address"
					    	requiredErrorText="Your contact email is required"
								onChange={this.handleTextFieldChange}
					    	onFormRegister={this.registerValidatingInput}/>

					    <EnhancedTextField name="mailBodyField"
					    	value={this.state.mailBodyField}
					    	helperText="Comment"
					    	floatingLabelText="Comment"
								multiline={true}
								rows={4}
					    	isRequired={true}
					    	requiredErrorText="A comment is required"
								fullWidth={true}
								onChange={this.handleTextFieldChange}
					    	onFormRegister={this.registerValidatingInput}/>

					    {this.state.humanVerified || !this.props.useRecaptcha ?
							<Button
								label="Submit"
								labelPosition="before"
								onTouchTap={this.handleSubmitTap}
								primary={true}/>
					    	:
							<Recaptcha
								style={{maxWidth: '100%'}}
	          					render="explicit"
								sitekey="6Lfgbw4UAAAAALo2c-sShjsMqKg4AR1j4I3yFA6D"
								verifyCallback={verifyCaptchaCallback}
	          					onloadCallback={captchaLoadCallback} />
					    }

					</div>

					<div>
						<div style={{
							padding:10,
							font: '17px/1 "Oxygen", sans-serif',
							color: '#7c7c7c',
							lineHeight: 1.5,
							fontWeight: 'bold'
							}} >
							Message sent succesfully!
						</div>

						<Button
							label="Go Back"
							labelPosition="before"
							onTouchTap={this.handleSendAnotherTap}
							primary={true}/>
					</div>

				</SwipeableViews>

		        <Dialog
		          actions={[
				      <Button
				        label="Ok"
				        primary={true}
				        onTouchTap={this.handleToggleErrorDialog}
				      />,
				    ]}
		          modal={false}
		          open={this.state.errorDialogOpen}
		        >
		          {this.state.errorDialogText}
		        </Dialog>

      		</div>
		);
	}
}

export default ContactForm;
