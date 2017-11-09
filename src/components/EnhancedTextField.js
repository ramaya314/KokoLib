import React from 'react';

import TextField from 'material-ui/TextField';

import validator from 'validator';

//import textMaskCore from 'text-mask-core';
var textMaskCore = require('text-mask-core')


class EnhancedTextField extends React.PureComponent 
{

	constructor(props) {
		super(props);
		this.state = {
			errorText : ''
		}
	}

	componentWillMount() {
		this.props.onFormRegister && this.props.onFormRegister(this);
	}

	componentDidMount() {
		if(this.props.mask != null && this.props.mask.length > 0) {
			console.log(textMaskCore);
		}
	}

	handleChange = (e) => {

		let currVal = e.target.value;

		if(this.props.mask != null && this.props.mask.length > 0) {
			var maskResults = textMaskCore.conformToMask(currVal, this.props.mask, {guide: false})
			currVal = maskResults.conformedValue;
		}

    	this.setState({value: currVal});

    	this.validateIsRequired(currVal) &&
    		this.validateFormat(currVal);

		this.props.onChange && this.props.onChange({target: {name: e.target.name, value: currVal}});
	}

	validateIsRequired(value) {
		if(!this.props.isRequired || (value && value.length > 0)){
    		this.setState({errorText: ""});
			return true;
		} else {
    		this.setState({errorText: this.props.requiredErrorText});
			return false;
		}
	}

	validateFormat(value) {

		if(this.props.validationType && 
			this.props.validationType.length > 0 && 
			value != null && 
			value.length > 0){
			
			let isValid = true;
			switch(this.props.validationType) {
				case "email":
					isValid = validator.isEmail(value);
					break;
				case "numeric":
					isValid = validator.isNumeric(value);
					break;
				case "phone":
					isValid = validator.isMobilePhone(value);
					break;
				default:
					break;
			}
			if(isValid) {
	    		this.setState({errorText: ""});
				return true;
			} else {
	    		this.setState({errorText: this.props.formatErrorText});
				return false;
			}
		} else {
    		this.setState({errorText: ""});
			return true;
		}
	}

	fieldIsValid() {
		return this.validateIsRequired(this.props.value) && this.validateFormat(this.props.value);
	}


	render() {
		return(
			<TextField id={this.props.id}
				className={this.props.className}
				defaultValue={this.props.defaultValue}
				disabled={this.props.disabled}
				errorStyle={this.props.errorStyle}
				errorText={this.state.errorText}
				floatingLabelFixed={this.props.floatingLabelFixed}
				floatingLabelFocusStyle={this.props.floatingLabelFocusStyle}
				floatingLabelStyle={this.props.floatingLabelStyle}
				floatingLabelText={this.props.floatingLabelText}
				fullWidth={this.props.fullWidth}
				hintStyle={this.props.hintStyle}
				hintText={this.props.hintText}
				inputStyle={this.props.inputStyle}
				multiLine={this.props.multiLine}
				name={this.props.name}
				rows={this.props.rows}
				rowsMax={this.props.rowsMax}
				style={this.props.style}
				textareaStyle={this.props.textareaStyle}
				type={this.props.type}
				onChange={this.handleChange}
				value={this.props.value}/>
		);
	}
} 


export default EnhancedTextField;