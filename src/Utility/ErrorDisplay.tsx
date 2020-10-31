import React from "react";
import { Alert } from "react-bootstrap";

export interface ErrorDisplayProps {
  error: Error;
  key: number;
  errorInfo: Record<string, any>;
}

export const ErrorDisplay = (props: ErrorDisplayProps) => {
  const { error, key, errorInfo } = props;
  console.error("ERROR=>", props, errorInfo);
  return (
    <Alert variant={"error"} key={key} data={errorInfo}>
      {error.message}
    </Alert>
  );
};

export default ErrorDisplay;
