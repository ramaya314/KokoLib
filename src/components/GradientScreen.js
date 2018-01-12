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

    constructor(props) {
        super(props);
        this.state = {
            ready : false,
            id : 0
        }
    }   

    componentWillMount() {
        this.setState({id: `id${new Date().getTime()}`});
    }

    componentDidMount() {
        this.setState({ ready: true });
    }


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

        var s1 = `${this.getTopShadow()}, ${this.getBottomShadow()}`;
        var s2 = `${this.getLeftShadow()}, ${this.getRightShadow()}`;

		return(
			<div style={{position:'relative', width:'100%', height:'100%'}}>

                {this.state.ready &&

                    <div dangerouslySetInnerHTML={{
                    __html: `
                        <style>
                            .kokolib_gradientScreen_shadow {
                                content: "";
                                height: 100%;
                                left: 0;
                                margin: 0 auto;
                                pointer-events: none;
                                position: absolute;
                                right: 0;
                                top: 0;
                            }

                            .kokolib_gradientScreen_shadow_one_${this.state.id} {
                                box-shadow: ${s1}
                            }

                            .kokolib_gradientScreen_shadow_two_${this.state.id} {
                                box-shadow: ${s2}
                            }
                        </style>
                        `
                    }} />
                }
                {this.state.ready &&
                    <div className={"kokolib_gradientScreen_shadow kokolib_gradientScreen_shadow_one_" + this.state.id} />
                }
				<div className="kokolib_shadowScreen_fog" style={{
					content: "",
					height: '100%',
					left: 0,
					margin: '0 auto',
					pointerEvents: 'none',
					position: 'absolute',
					right: 0,
					top: 0,
					background: `rgba(0,0,0,${this.props.fogAmount})`
				}}/>
                {this.state.ready &&
    				<div className={"kokolib_gradientScreen_shadow kokolib_gradientScreen_shadow_two_" + this.state.id} />
                }
			</div>
		);
	}
}


export default GradientScreen;