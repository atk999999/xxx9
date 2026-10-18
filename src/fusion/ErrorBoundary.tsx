import { ShieldAlert } from "lucide-react";
import React, { useEffect, useState } from "react";

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      console.error("App Error:", e.error);
      setHasError(true);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/20 p-8 rounded-3xl text-center space-y-6">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Đã xảy ra lỗi hệ thống</h1>
          <p className="text-slate-400">Vui lòng tải lại trang hoặc kiểm tra kết nối mạng.</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-colors"
          >
            Tải lại trang
          </button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
