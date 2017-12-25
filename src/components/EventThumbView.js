import React from 'react';
import {Image, Col, Row} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import dateFormat from 'dateformat';
import DataContainer from './DataContainer';
import Utils from '../Utils';



class EventThumbViewAnimationCSS extends React.PureComponent {
	render() {

		return(
			<div dangerouslySetInnerHTML={{
			__html: `
				<style>
					.kokolib_event_thumbview {
						-webkit-transition: 1s;
						-moz-transition: 1s;
						-o-transition: 1s;
						transition: 1s;
					}

					.kokolib_event_thumbview.focused {
						transform:scale(1.03) !important;
					}

				</style>
				`
			}} />
		);
	}
}


class EventThumbView extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            focused: false
        }
    } 

	getStyles() {
		const styles = {
			paperStyle : {
				margin: 20,
			},
			logoStyle: {
				width: '100%',
			},
			descriptionBody: {
				marginTop: 10,
				width: '100%',
			},
			eventTitle: {
				fontWeight: 'bold',
				fontSize: 20,
				color: '#000'

			},
			eventDate: {
				fontSize: 18,
			}
		};
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

		console.log("render");

		const styles = this.getStyles();

		var ellipsedText = "";
		if(this.props.data.description.text && this.props.data.description.text.length > 0)
			ellipsedText = (this.props.data.description.text).substring(0,200) + "...";

		var startDateTime = dateFormat(Utils.getValidDate(this.props.data.start.utc), "dddd, mmmm dS, yyyy");

		//console.log(this.props.data);

		var linkUrl = "";


		if(this.props.match && this.props.match.url && this.props.match.url.length > 1) {
			linkUrl += `${this.props.match.url}/`;
		}

		if(this.props.targetPageRoot && this.props.targetPageRoot.length > 0) {
			linkUrl += `${this.props.targetPageRoot}/`;
		} 

		
		if(this.props.data.fbEvent)
			linkUrl += "fb";

		linkUrl += this.props.data.id;

		linkUrl = linkUrl.replace("//", "/");


        const componentClasses = ['kokolib_event_thumbview'];
        if (this.state.focused) { componentClasses.push('focused'); }

		return(
			<div>
				<EventThumbViewAnimationCSS />
				<a  href={linkUrl} >
					<div className={componentClasses.join(' ')}  
						onMouseEnter={this.onHoverEnter}
	                    onMouseLeave={this.onHoverLeave}>

		    			<Paper style={styles.paperStyle} zDepth={3} >
							{false && 
								<pre>{JSON.stringify(this.props.data, null, 4) }</pre>
							}
							<Row>

								<Col xs={12} sm={4} md={4} lg={2} lgHidden={true} >
									{this.props.data.logo && !this.props.data.fbEvent &&
										<Image src={this.props.data.logo.url} style={styles.logoStyle}/>
									}

									{this.props.data.fbEvent && 
										<DataContainer action="/api/v1/GetFacebookEventPicture" 
											parameters={[
												{id:"eventId", value: this.props.data.id}
											]}
											resultRender={function(pictureData) {
												return (
													<Image src={pictureData.location} style={styles.logoStyle}/>
												);
										}} />
									}
								</Col>
								<Col xs={12} sm={8} md={8} lg={12}>
									<Row>

										<Col xsHidden={true} smHidden={true} mdHidden={true}  lg={3}>
											{!this.props.data.fbEvent &&
												<Image src={this.props.data.logo.url} style={styles.logoStyle} />
											}
											{this.props.data.fbEvent && 
												<DataContainer action="/api/v1/GetFacebookEventPicture" 
													parameters={[
														{id:"eventId", value: this.props.data.id}
													]}
													resultRender={function(pictureData) {
														return (
															<Image src={pictureData.location} style={styles.logoStyle}/>
														);
												}} />
											}
										</Col>


										<Col xs={12} lg={4} >
											<div style={{padding:10}}>
												<div style={styles.eventTitle}>
													{this.props.data.name.text}
												</div>
												<div style={styles.eventDate}>
													{startDateTime}
												</div>
											</div>
										</Col>

										<Col xsHidden={true} mdHidden={true} smHidden={true} lg={5} >
											<div style={styles.descriptionBody} >
												{ellipsedText}
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={12} lgHidden={true} >
											<hr style={{margin:0}} />
												<div style={{padding:"5px 25px"}}>
													<div style={styles.descriptionBody} >
														{ellipsedText}
													</div>
												</div>
										</Col>
									</Row>
								</Col>
							</Row>
		    			</Paper>
	    			</div>
				</a>
			</div>
		);
	}
}

export default EventThumbView;