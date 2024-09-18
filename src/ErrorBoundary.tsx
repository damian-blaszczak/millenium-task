import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  errorInfo: ErrorInfo | undefined;
  error: Error | undefined;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    errorInfo: undefined,
    error: undefined
  };

  public static getDerivedStateFromError(
    error: Error,
    errorInfo: ErrorInfo
  ): State {
    return { error, errorInfo };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.error) {
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h2>Something went wrong.</h2>
          <details open style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
