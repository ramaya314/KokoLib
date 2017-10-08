import React from 'react';
import Loading from 'react-loading';

class DataContainer extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isLoading : true,
		}
		this.getData();
	}   

	equalRequests = (a, b) => {
		if(a.action !== b.action)
			return false;

		if(JSON.stringify(a.parameters) !== JSON.stringify(a.parameters))
			return false;

		return true;
	}

	componentWillUpdate(nextProps, nextState) {
		if(!this.equalRequests(nextProps, this.props))
			this.getData();
	}

	getData() {
		if(!this.props || this.props == null)
			return;

		let that = this;
		this.GET(this.props.action, this.props.parameters, function(data) {
			that.setState({
				data : data,
				isLoading: false,
			});
		}, function(error) {
			console.log(error);
		});
	}

	GET(action, parameters, onSuccess, onError) {

		let host = window.location.protocol + "//" +
					window.location.hostname +
					(window.location.hostname.toLowerCase().indexOf('localhost') >= 0 ? ":4000" :
						(window.location.port ? ":" + window.location.port : ""));

		if(!action || action === null)
			action = '/';
		else if(!action.startsWith('/'))
			action = "/" + action;

		let parameterString = '';
		if(parameters && parameters != null && parameters.length > 0) {
			parameterString += "?"
			for(var i = 0, l = parameters.length; i < l; i++) {
				var currPar = parameters[i];
				parameterString += currPar.id + "=" + encodeURI(currPar.value) + "&"
			}
			parameterString = parameterString.substr(0, parameterString.length - 1);
		}

		let fullRequest = host + action + parameterString;
		var that = this;

		fetch(fullRequest, {
			method : "GET",
		}).then(function(res) {
			if (res.ok) {
				res.json().then(function(json) {
					onSuccess && onSuccess(json);
				}); 
			} else {
				onError && onError(res);
			}
		}, function(e) {
			onError && onError(e);
		});
	}



	render(){
		return(
      		<div>
				<div style={{textAlign:'center', display:(this.state.isLoading ? "" : "none")}}>
					<div style={{width:64,height:64,marginLeft:'auto',marginRight:'auto'}}>
						<Loading type='spin' color='#000' />
					</div>
				</div>
      			{!this.state.isLoading && this.props.showRawData &&
						<pre>{JSON.stringify(this.state.data, null, 4) }</pre>
				}

      			{!this.state.isLoading && this.props.resultRender &&
      				this.props.resultRender(this.state.data)
				}
      		</div>
		)
	}
}

export default DataContainer;