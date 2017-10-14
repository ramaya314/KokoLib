import React from 'react';

import { Thumbnail, Col, Row } from 'react-bootstrap';

import { Route } from 'react-router-dom';

import AlbumView from './AlbumView';

import { LinkContainer } from 'react-router-bootstrap';

import muiThemeable from 'material-ui/styles/muiThemeable';

class GalleryCollection extends React.Component
{


	getStyles() {
		const styles = {
			albumThumbContainer: {
				width:250,
				height:300,
				marginLeft: 'auto',
				marginRight: 'auto',
				textAlign: 'right',
			},
			albumThumbImage: {
				width: '100%',
				height: 200,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			},
			albumThumbTitle: {
				fontSize:'1.2em',
				fontWeight: 'bold',
				color: this.props.muiTheme.palette.accent1Color,
				borderTop: '2px solid ' + this.props.muiTheme.palette.primary2Color,
				marginTop: 3,
			},
			albumThumNumPics: {
				color: this.props.muiTheme.palette.primary2Color,
			},
		}
		return styles;
	}

	render() {

		const styles = this.getStyles();
		const that = this;

		return(
			<div>
				<Row>

					<Route exact path={`${this.props.match.url}`}  render={() => (

						<div>
							{this.props.data.map(function(album, i) {
								return(
									<div key={i}>
										<Col xs={12} sm={6} md={4} lg={3}>

											{/*
												{id, name, num_photos, published, title, summary, location, nickname, photos}
											*/}

											<LinkContainer to={`${that.props.match.url}/${album.id}`}>
												<Thumbnail style={styles.albumThumbContainer} >
													<div style={{ ...styles.albumThumbImage, backgroundImage: 'url(' + album.media.media$content[0].url + ')'}} />
													<p style={styles.albumThumbTitle}>{album.title}</p>
													<p style={styles.albumThumNumPics}>{album.num_photos} photo{album.num_photos > 1 && 's'}</p>
												</Thumbnail>
											</LinkContainer>
										</Col>

									</div>
								);
							})}
						</div>
					)} />




					<Route path={`${this.props.match.url}/:albumId`}  render={({match}) => {

						let selectedAlbum = null;
						console.log(this.props.data);
						for(var i = 0; i < this.props.data.length; i++) {
							if(this.props.data[i].id === match.params.albumId){
								selectedAlbum = this.props.data[i];
								break;
							}
						}
						return(
							<AlbumView album={selectedAlbum} />
						);
					}} />

				</Row>

			</div>
		)
	}
}

export default muiThemeable()(GalleryCollection);
