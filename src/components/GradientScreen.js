import React from 'react';
import PropTypes from 'prop-types';

class GradientScreen extends React.PureComponent
{

	/*A shadow object looks like
		{
			length:number,
			color:string
		}
	*/

    static propTypes = {
        topShadow: PropTypes.object,
        bottomShadow: PropTypes.object,
        leftShadow: PropTypes.object,
        rightShadow: PropTypes.object,
        fogAmount: PropTypes.number
    };

    static defaultProps = {
        topShadow: null,
        bottomShadow: null,
        leftShadow: null,
        rightShadow: null,
        fogAmount: 0
    };

    getTopShadow() {
    	return this.getShadow(this.props.topShadow, function(length, blur, spread, color) {
    		return `inset 0px ${length}px ${blur}px ${spread}px ${color}`;
    	});
    }

    getBottomShadow() {
    	return this.getShadow(this.props.bottomShadow, function(length, blur, spread, color) {
    		return `inset 0px ${-length}px ${blur}px ${spread}px ${color}`;
    	});
    }

    getLeftShadow() {
    	return this.getShadow(this.props.leftShadow, function(length, blur, spread, color) {
    		return `inset ${length}px 0px ${blur}px ${spread}px ${color}`;
    	});
    }

    getRightShadow() {
    	return this.getShadow(this.props.rightShadow, function(length, blur, spread, color) {
    		return `inset ${-length}px 0px ${blur}px ${spread}px ${color}`;
    	});
    }

    getShadow(shadow, formatF) {

    	if(!shadow || shadow === null)
    		return 'inset 0px 0px 0px rgba(0,0,0,0)';

    	//no ngative values on the blur
    	if(shadow.blur < 0) {
    		shadow.blur *= -1;
    	}

    	var blur = Math.abs(shadow.length / 2);
    	var spread = -blur;

    	var shadow = formatF(shadow.length, blur, spread, shadow.color);

    	return shadow;
    }

	render() {
		return(
			<div style={{position:'relative', width:'100%', height:'100%'}}>
				<div className="kokolib_shadowScreen_shadow" style={{
					content: "",
					height: '100%',
					left: 0,
					margin: '0 auto',
					pointerEvents: 'none',
					position: 'absolute',
					right: 0,
					top: 0,
					boxShadow: `${this.getTopShadow()}, ${this.getBottomShadow()}`
				}}/>
				<div className="kokolib_shadowScreen_fog" style={{
					content: "",
					height: '100%',
					left: 0,
					margin: '0 auto',
					pointerEvents: 'none',
					position: 'absolute',
					right: 0,
					top: 0,
					background: `rgba(0,0,0,${this.props.fogAmount}`
				}}/>
				<div className="kokolib_shadowScreen_shadow" style={{
					content: "",
					height: '100%',
					left: 0,
					margin: '0 auto',
					pointerEvents: 'none',
					position: 'absolute',
					right: 0,
					top: 0,
					boxShadow: `${this.getLeftShadow()}, ${this.getRightShadow()}`
				}}/>

			</div>
		);
	}
}


export default GradientScreen;