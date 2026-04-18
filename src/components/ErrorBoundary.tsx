import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary-overlay" className="fixed inset-0 z-[9999] bg-bg flex items-center justify-center p-6">
          <div className="max-w-md w-full content-card border-prism-1/30 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-prism-1/10 text-prism-1">
                <AlertTriangle size={48} />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">System Critical Failure</h2>
            <p className="text-text-muted mb-8 text-sm font-mono leading-relaxed">
              The neural kernel encountered an unrecoverable exception. Core protocols have been suspended to prevent data corruption.
            </p>
            <div className="bg-black/40 p-4 rounded border border-white/5 mb-8 text-left">
              <p className="text-[0.6rem] font-mono text-prism-1 uppercase mb-2 tracking-widest">Error Log:</p>
              <p className="text-[0.7rem] font-mono text-text-main break-all">
                {this.state.error?.message || 'Unknown system fault'}
              </p>
            </div>
            <button
              id="reset-system-button"
              onClick={this.handleReset}
              className="w-full py-4 bg-prism-1/20 hover:bg-prism-1/30 text-prism-1 border border-prism-1/50 font-mono text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group"
            >
              <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              Reinitialize Kernel
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
