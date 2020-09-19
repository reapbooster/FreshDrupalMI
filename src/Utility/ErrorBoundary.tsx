import React from 'react';

interface ErrorBoundaryProps {
  key?: number;
}

interface ErrorBoundaryState {
  error?: Error;
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {


    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = {
        error: null,
        hasError: false
      };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      console.debug("getDerivedStateFromError", error);
      return {
        error: error,
        hasError: true
      };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.error(error, errorInfo);
    }

    render() {
      const content = this.state.hasError ? (
        <>
          <h1 className={"error"}>{this.state.error?.message ?? "Something Went Wrong"}</h1>
        </>
      ) : this.props.children;
      return (
        <>
          <error-boundary key={this.props.key || 0}>
            {content}
          </error-boundary>
        </>
      );
    }
  }

  export default ErrorBoundary;
