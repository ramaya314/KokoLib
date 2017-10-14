import React from 'react';
import Gallery from 'react-grid-gallery';
import {Col, Button } from 'react-bootstrap';
import DataContainer from './DataContainer';

class AlbumView extends React.Component
{

	render() {

		return(
			<div>
				<Col xs={12}>

					<h1>
						{this.props.album.title}
					</h1>


					<DataContainer action="api/v1/GetAlbumPhotos" 
						parameters={[{id:"albumId", value: this.props.album.id}]}
						resultRender={function(data) {

							let images = [];
							for(var i = 0; i < data.length; i++) {
								images.push({
									src: data[i].content.src,
									thumbnail: data[i].content.src,
									thumbnailWidth: parseInt(data[i].width, 10) / 10,
									thumbnailHeight: parseInt(data[i].height, 10) / 10
								});
							}
							return (<Gallery images={images} />);
					}}>
					</DataContainer>

					<Button bsStyle="primary" bsSize="large" block onClick={() => {
						window.location = '/gallery';	
					}}>Back to Gallery</Button>
				</Col>
			</div>
		);
	}
}


export default AlbumView;