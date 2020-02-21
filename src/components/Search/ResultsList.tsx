import * as React from 'react';
import SearchResult from './SearchResult';

interface ResultsListProps {
  results: Array<any>
}


const ResultsList = (props) => (
  <ol>
    {props.results.map((result, key) => (
      <li key={key}>{result}</li>
    ))}
  </ol>
);

ResultsList.defaultProps = {
 results: []
}

export default ResultsList;
