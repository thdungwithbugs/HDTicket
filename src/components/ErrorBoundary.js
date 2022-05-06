import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Lifecycle này sẽ đc chạy khi có error xảy ra
  static getDerivedStateFromError(error) {
    // Khi có error xảy ra, cập nhất state cho biến hasError thành true
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Thường dùng để gọi tới 1 service bên ngoài (Sentry) để thông báo lỗi
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // render ra fallback UI khi có error làm crash app
      return <h1>Something went wrong.</h1>;
    }

    return <>{this.props.children}</>;
  }
}
