import * as React from 'react';
import SearchResult from './SearchResult';

class SearchApiRequest extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      keywords: "",
      results: [],
    }
  }

  onSubmitHandler(values) {
    this.setState({
      keywords: values.keywords
    });
    fetch(`/api/v1.0/search?_format=json&search_api_fulltext=${values.keywords}`)
      .then(res => res.json())
      .then((ajaxResults) => {
        if (ajaxResults) {
          this.setState({
            results: ajaxResults.map((singleresult) => <SearchResult {...singleresult} />)
          });
        }
        console.log(this);
      })
  }

  getKeywords() {
    return this.state.keywords;
  }

  getResults() {
    return this.state.results;
  }

}


export default SearchApiRequest;
