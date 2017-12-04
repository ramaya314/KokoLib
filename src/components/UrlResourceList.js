
import React from 'react';

import {Col, Row, Image} from 'react-bootstrap';

import Spacer from './Spacer';
import DataContainer from './DataContainer';
import UrlThumb from './UrlThumb';

class UrlResourceList extends React.Component
{

	render() {

		return(
			<DataContainer action={this.props.action} resultRender={function(data) {
				return(
					<div>
						{data && data.map(function(resource, i) {
							if(!resource || Object.keys(resource).length <= 0)
								return <span key={i}/>;

							if(!resource.url || resource.url.length <=0 || resource.url.endsWith(".pdf")) {
								return(
									<div key={i}>
										<UrlThumb url={resource.url}
											title={resource.title}
											description={resource.description}
											image={resource.image} />
										<Spacer space={25} />
									</div>
								)
							}

							return(
								<DataContainer key={i} 
									action="api/v1/GetPageMeta" 
									parameters={[
										{id:"url", value: resource.url}
									]}
									showRawData={false}
									resultRender={function(pageData) {

										if(!pageData || Object.keys(pageData).length <= 0) {
											if(!resource || (!resource.title && !resource.description))
												return <span />;
											else
												return(
													<div>
														<UrlThumb url={resource.url} 
															title={resource.title}
															description={resource.description}
															image={resource.image} />
														<Spacer space={25} />
													</div>
												);
										}

										return(
											<div>
												<UrlThumb url={pageData.url || resource.url} 
													title={resource.title || pageData.title}
													description={resource.description || pageData.description}
													image={resource.image || pageData.image} />
												<Spacer space={25} />
											</div>
										);
									}}
									errorRender={function(error) {
										return(
											<div>
												<UrlThumb url={resource.url} 
													title={resource.title}
													description={resource.description}
													image={resource.image} />
												<Spacer space={25} />
											</div>
										);
									}} 
								 />
							);
						})}
					</div>

				);
			}} />
		);
	}
}


export default UrlResourceList;