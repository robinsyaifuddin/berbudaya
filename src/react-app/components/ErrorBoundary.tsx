import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in React tree:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-md border border-neutral-200 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              !
            </div>
            <h2 className="text-lg font-bold text-neutral-900 mb-2">Terjadi Kesalahan Tampilan</h2>
            <p className="text-xs text-neutral-600 mb-4 break-words font-mono bg-neutral-100 p-3 rounded-lg text-left max-h-40 overflow-y-auto">
              {this.state.error?.message || "Kesalahan tidak dikenal saat memuat halaman."}
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
              >
                Muat Ulang
              </button>
              <button
                onClick={() => {
                  localStorage.setItem(
                    'demo_user',
                    JSON.stringify({
                      id: 'demo-123',
                      name: 'official.rbnsyaf',
                      email: 'user@Berbudaya.id',
                      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
                      loginTime: new Date().toISOString()
                    })
                  );
                  window.location.href = '/beranda';
                }}
                className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-xl text-xs font-semibold hover:bg-neutral-50 transition"
              >
                Buka Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
