import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
//import AddIcon from 'material-ui/icons/Add';
import Icon from 'material-ui/Icon';
import SvgIcon from 'material-ui/SvgIcon';
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
      onSearch: PropTypes.func
  };

  static defaultProps = {
      onSearch: null
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
    if(this.state.searchTerm.length <= 0)
      this.setState({open:!this.state.open});
    else
      this.setState({open:true});
  }


  handleSearchTermChange = (e) => {
    this.setState({ searchTerm: e.target.value });
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
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
            placeholder="Search" />
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
