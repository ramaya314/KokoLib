import React from 'react';
import PropTypes from 'prop-types';

class ShadowScreen extends React.PureComponent
{

	/*A shadow object looks like
		{
			v:number,
			h:number,
			blur:number,
			spread:number,
			color:string
		}
	
	*/
    static propTypes = {
        shadowOne: PropTypes.object,
        shadowTwo: PropTypes.object,
        shadowThree: PropTypes.object,
        shadowFour: PropTypes.object,
        fogAmount: PropTypes.number
    };

    static defaultProps = {
        shadowOne: null,
        shadowTwo: null,
        shadowThree: null,
        shadowFour: null,
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

    getShadowOne() {
    	return this.getShadow(this.props.shadowOne);
    }

    getShadowTwo() {
    	return this.getShadow(this.props.shadowTwo);
    }

    getShadowThree() {
    	return this.getShadow(this.props.shadowThree);
    }

    getShadowFour() {
    	return this.getShadow(this.props.shadowFour);
    }

    getShadow(shadow) {

    	if(!shadow || shadow === null)
    		return 'inset 0px 0px 0px rgba(0,0,0,0)';

    	var shadow = `inset ${shadow.h}px ${shadow.v}px ${Math.abs(shadow.blur)}px ${shadow.spread}px ${shadow.color}`;

    	return shadow;
    }


	render() {
		
        var s1 = `${this.getShadowOne()}, ${this.getShadowTwo()}`;
        var s2 = `${this.getShadowThree()}, ${this.getShadowFour()}`;

		return(
			<div style={{position:'relative', width:'100%', height:'100%'}}>


                {this.state.ready &&

                    <div dangerouslySetInnerHTML={{
                    __html: `
                        <style>
                            .kokolib_shadowScreen_shadow {
                                content: "";
                                height: 100%;
                                left: 0;
                                margin: 0 auto;
                                pointer-events: none;
                                position: absolute;
                                right: 0;
                                top: 0;
                            }

                            .kokolib_shadowScreen_shadow_one_${this.state.id} {
                                box-shadow: ${s1}
                            }

                            .kokolib_shadowScreen_shadow_two_${this.state.id} {
                                box-shadow: ${s2}
                            }
                        </style>
                        `
                    }} />
                }
                {this.state.ready &&
    				<div className={"kokolib_shadowScreen_shadow kokolib_shadowScreen_shadow_one_" + this.state.id} />
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
					background: `rgba(0,0,0,${this.props.fogAmount}`
				}}/>
                {this.state.ready &&
    				<div className={"kokolib_shadowScreen_shadow kokolib_shadowScreen_shadow_two_" + this.state.id} />
				}
			</div>
		);
	}
}


export default ShadowScreen;