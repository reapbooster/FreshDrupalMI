import React from 'react';

class ErrorBoundary extends React.Component {

    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      console.debug("getDerivedStateFromError", error);
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.error(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <h1>Something went wrong.</h1>
        );
      }

      return (
        <error-boundary key={this.props.key || 0}>
          {this.props.children}
        </error-boundary>
      );
    }
  }

  export default ErrorBoundary;
