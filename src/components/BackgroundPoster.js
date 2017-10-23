import React from 'react';
import PropTypes from 'prop-types';

import GradientScreen from './GradientScreen';
import ShadowScreen from './ShadowScreen';
import MeasuredContainer from '../elements/MeasuredContainer';

class BackgroundPosterShadow extends React.PureComponent {
    render() {

        let smallScreen = this.props.containerWidth < 768;
        let largeScreen = this.props.containerWidth >= 1200;
        let mediumScreen = !smallScreen && !largeScreen;

        let visibleAreaLength = largeScreen ? -100 : mediumScreen ? 100 : 200;

        let color = 'rgba(0, 0, 0, 0.9)';

        return(
            <GradientScreen fogAmount={0.1} 
                leftShadow={{
                    length:60,
                    color:color
                }}
                rightShadow={{
                    length:60,
                    color:color
                }}
                topShadow={{
                    length: 100,
                    color:color
                }}
                bottomShadow={{
                    length: (this.props.containerHeight + visibleAreaLength),
                    color:color
                }} 
                />
        );
    }
}


class BackgroundPoster extends React.PureComponent
{

    static propTypes = {
        imagePath: PropTypes.string,
        addShadow: PropTypes.bool
    };

    static defaultProps = {
        imagePath: "",
        addShadow: false
    };

	render() {

        return(
            <div style={{
                backgroundImage: `url('${this.props.imagePath}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
                position:'fixed'
            }}>
                {this.props.addShadow &&
                    <MeasuredContainer>
                        <BackgroundPosterShadow />
                    </MeasuredContainer>
                }


            </div>
		);
	}
}


export default BackgroundPoster;
