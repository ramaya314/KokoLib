import React from 'react';
import Loading from 'react-loading';
import axios from 'axios';

class DataContainer extends React.PureComponent {


	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isLoading : true,
			hasError: false
		}
	}   

	equalRequests = (a, b) => {
		if(a.action !== b.action)
			return false;

		if(JSON.stringify(a.parameters) !== JSON.stringify(a.parameters))
			return false;

		return true;
	}

	componentWillMount() {
		this.getData();
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
				hasError: false
			});
		}, function(error) {
			that.setState({
				data : error,
				isLoading: false,
				hasError: true
			});
			//console.log(error);
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

		axios.get(fullRequest).then(function (response) {
			if (response.status === 200) {
				onSuccess && onSuccess(response.data);
			} else {
				onError && onError(response);
			}
		}).catch(function (error) {
			onError && onError(error);
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

      			{!this.state.isLoading && !this.state.hasError && this.props.resultRender &&
      				this.props.resultRender(this.state.data)
				}

      			{!this.state.isLoading && this.state.hasError && this.props.errorRender &&
      				this.props.errorRender(this.state.data)
				}
      		</div>
		)
	}
}

export default DataContainer;