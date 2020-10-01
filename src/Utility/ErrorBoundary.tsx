import React from "react";

export interface ErrorBoundaryProps {
  key?: number;
}

export interface ErrorBoundaryState {
  error?: Error;
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.debug("getDerivedStateFromError", error);
    return {
      error,
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    const content = this.state.hasError ? (
      <>
        <div className="alert alert-danger">
          <h4>
            {this.state.error?.message ?? "Something Went Wrong"}
          </h4>
        </div>
      </>
    ) : (
      this.props.children
    );
    return (
      <>
        <error-boundary key={this.props.key || 0}>{content}</error-boundary>
      </>
    );
  }
}

export default ErrorBoundary;
