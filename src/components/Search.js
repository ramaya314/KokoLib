import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import SearchIcon from '@material-ui/icons/Search';

import  {FormGroup, FormControl} from 'react-bootstrap';
class Search extends React.PureComponent
{

  constructor(props) {
    super(props);
		this.state = {
			open: false,
      searchTerm: ''
		}
  }

  static propTypes = {
      onSearch: PropTypes.func,
      onSearchTermChange: PropTypes.func,
      placeholder: PropTypes.string,
  };

  static defaultProps = {
      onSearch: (searchTerm) => {},
      onSearchTermChange: () => {},
      placeholder: 'search',
  };

  getCss = () => {
    return(
			<div dangerouslySetInnerHTML={{
			__html: `
				<style>
          .kokolib_search_entry {
            width:0;
            opacity:0;
            -webkit-transition: 1s;
            -moz-transition: 1s;
            -o-transition: 1s;
            transition: 1s;
          }

          .kokolib_search_entry {
          }

          .kokolib_search_entry.open {
            width:200px !important;
            opacity:1;

          }
				</style>
				`
			}} />
    );
  }

  onSearchClick = () => {
    if(this.state.searchTerm.length <= 0) {
      this.setState({open:!this.state.open});
      this.focus();
    }
    else {
      this.props.onSearch(this.state.searchTerm);
    }
  }

  focus = () => {
    let node = ReactDOM.findDOMNode(this.searchInput);
    if (node && node.focus instanceof Function) {
      node.focus();
    }
  }


  handleSearchTermChange = (e) => {
    this.setState({ searchTerm: e.target.value });
    this.props.onSearchTermChange(e.target.value);
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter' && this.state.searchTerm.length > 0){
      this.props.onSearch(this.state.searchTerm);
    }
  }

	render() {

    const entryClasses = [`kokolib_search_entry`];
    if(this.state.open)
      entryClasses.push("open");

		return(
			<div className="kokolib_search">
        {this.getCss()}

        <FormGroup style={{display: 'inline-block', paddingRight:10}} className={entryClasses.join(' ')}>
          <FormControl
            onKeyPress={this.handleKeyPress}
            type="text"
            ref={(input) => { this.searchInput = input; }}
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
            placeholder={this.props.placeholder} />
        </FormGroup>
        <Button mini variant="fab" color="primary" aria-label="add"
          onClick={this.onSearchClick}>
          <SearchIcon></SearchIcon>
        </Button>
      </div>
		);
	}
}
export default Search;
