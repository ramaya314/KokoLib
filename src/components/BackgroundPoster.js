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

        let color = 'rgba(0, 0, 0, 0.95)';

        //return <div />;

        return(
            <div className="kokolib_shadowScreen_fog" style={{
                content: "",
                height: '100%',
                left: 0,
                margin: '0 auto',
                pointerEvents: 'none',
                position: 'absolute',
                right: 0,
                top: 0,
                background: `rgba(255,255,255,0.3)`
            }}/>
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
