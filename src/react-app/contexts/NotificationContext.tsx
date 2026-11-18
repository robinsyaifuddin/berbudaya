import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  X,
  HelpCircle
} from 'lucide-react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger';
}

interface ModalAlertOptions {
  title?: string;
  message: string;
  buttonText?: string;
  type?: ToastType;
}

interface NotificationContextType {
  toast: (message: string, type?: ToastType, title?: string, duration?: number) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  confirm: (options: ConfirmOptions | string) => Promise<boolean>;
  modalAlert: (options: ModalAlertOptions | string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    options: ConfirmOptions;
    resolve: (val: boolean) => void;
  } | null>(null);

  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    options: ModalAlertOptions;
    resolve: () => void;
  } | null>(null);

  const toastCounter = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = 'info', title?: string, duration = 4000) => {
    const id = `toast-${Date.now()}-${toastCounter.current++}`;
    setToasts((prev) => [...prev.slice(-3), { id, type, title, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const success = useCallback((message: string, title?: string) => toast(message, 'success', title), [toast]);
  const error = useCallback((message: string, title?: string) => toast(message, 'error', title), [toast]);
  const info = useCallback((message: string, title?: string) => toast(message, 'info', title), [toast]);
  const warning = useCallback((message: string, title?: string) => toast(message, 'warning', title), [toast]);

  // Dialog Konfirmasi (Iya / Tidak)
  const confirm = useCallback((options: ConfirmOptions | string): Promise<boolean> => {
    const parsedOptions: ConfirmOptions = typeof options === 'string' 
      ? { message: options, title: 'Konfirmasi' } 
      : { title: 'Konfirmasi', ...options };

    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        options: parsedOptions,
        resolve: (val: boolean) => {
          setConfirmState(null);
          resolve(val);
        }
      });
    });
  }, []);

  // Alert Pop-up Khusus Pesan Panjang / Multi-baris
  const modalAlert = useCallback((options: ModalAlertOptions | string): Promise<void> => {
    const parsedOptions: ModalAlertOptions = typeof options === 'string'
      ? { message: options, title: 'Pemberitahuan' }
      : { title: 'Pemberitahuan', ...options };

    return new Promise((resolve) => {
      setAlertState({
        isOpen: true,
        options: parsedOptions,
        resolve: () => {
          setAlertState(null);
          resolve();
        }
      });
    });
  }, []);

  // Pasang window.customAlert dan window.customConfirm agar modul non-hook atau direct call juga bisa pakai
  React.useEffect(() => {
    (window as any).__showAppToast = toast;
    (window as any).__showAppConfirm = confirm;
    (window as any).__showAppAlert = modalAlert;
  }, [toast, confirm, modalAlert]);

  return (
    <NotificationContext.Provider value={{ toast, success, error, info, warning, confirm, modalAlert }}>
      {children}

      {/* TOAST CONTAINER DI ATAS TENGAH - COMPACT, RESPONSIVE & MOBILE FRIENDLY */}
      <div 
        aria-live="polite" 
        className="fixed top-3 sm:top-5 inset-x-0 z-[99999] pointer-events-none flex flex-col items-center gap-2 px-3 sm:px-4"
      >
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isError = t.type === 'error';
          const isWarning = t.type === 'warning';

          return (
            <div
              key={t.id}
              className={`pointer-events-auto w-full max-w-[390px] sm:max-w-md rounded-xl bg-white shadow-lg shadow-black/5 border transition-all duration-200 animate-in fade-in slide-in-from-top-3 flex items-start gap-2.5 p-3 sm:py-2.5 sm:px-3.5 backdrop-blur-md bg-white/95 ${
                isSuccess 
                  ? 'border-emerald-200/80 text-emerald-950' 
                  : isError 
                  ? 'border-rose-200/80 text-rose-950' 
                  : isWarning 
                  ? 'border-amber-200/80 text-amber-950' 
                  : 'border-primary-100 text-slate-800'
              }`}
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5">
                {isSuccess && <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600" />}
                {isError && <AlertCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-rose-600" />}
                {isWarning && <AlertTriangle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-600" />}
                {!isSuccess && !isError && !isWarning && <Info className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-600" />}
              </div>

              {/* Message text */}
              <div className="flex-1 min-w-0 pr-1">
                {t.title && (
                  <p className="text-xs font-semibold text-slate-900 leading-tight mb-0.5">
                    {t.title}
                  </p>
                )}
                <div className="text-[12px] sm:text-xs leading-relaxed text-slate-700 whitespace-pre-line break-words">
                  {t.message}
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="shrink-0 p-1 text-slate-400 hover:text-slate-600 active:scale-95 rounded-lg transition-colors"
                title="Tutup"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* DIALOG KONFIRMASI (IYA / TIDAK) - CLEAN, MODERN & TIDAK KEBESARAN */}
      {confirmState && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150">
          <div 
            role="dialog"
            aria-modal="true"
            className="w-full max-w-[340px] sm:max-w-[380px] bg-white rounded-2xl p-5 shadow-2xl border border-stone-100 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-start gap-3">
              <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                confirmState.options.type === 'danger' 
                  ? 'bg-rose-50 text-rose-600' 
                  : confirmState.options.type === 'warning' 
                  ? 'bg-amber-50 text-amber-600' 
                  : 'bg-primary-50 text-primary-600'
              }`}>
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  {confirmState.options.title || 'Konfirmasi'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                  {confirmState.options.message}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => confirmState.resolve(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 active:scale-[0.98] transition-all"
              >
                {confirmState.options.cancelText || 'Batal'}
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => confirmState.resolve(true)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium text-white shadow-sm active:scale-[0.98] transition-all ${
                  confirmState.options.type === 'danger'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                {confirmState.options.confirmText || 'Ya, Lanjutkan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG MODAL ALERT (UNTUK SIMULASI KODE / INFORMASI LENGKAP DENGAN DESAIN BAGUS) */}
      {alertState && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150">
          <div 
            role="dialog"
            aria-modal="true"
            className="w-full max-w-[340px] sm:max-w-[380px] bg-white rounded-2xl p-5 shadow-2xl border border-stone-100 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  {alertState.options.title || 'Informasi'}
                </h3>
                <div className="text-xs text-slate-600 mt-1.5 leading-relaxed whitespace-pre-line bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {alertState.options.message}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                autoFocus
                onClick={() => alertState.resolve()}
                className="w-full sm:w-auto px-5 py-1.5 rounded-lg text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 active:scale-[0.98] transition-all shadow-sm"
              >
                {alertState.options.buttonText || 'Mengerti'}
              </button>
            </div>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    // Fallback jika dipanggil di luar provider
    return {
      toast: (msg: string) => {
        if (typeof window !== 'undefined' && (window as any).__showAppToast) {
          (window as any).__showAppToast(msg);
        } else {
          window.alert(msg);
        }
      },
      success: (msg: string) => (window as any).__showAppToast?.(msg, 'success'),
      error: (msg: string) => (window as any).__showAppToast?.(msg, 'error'),
      info: (msg: string) => (window as any).__showAppToast?.(msg, 'info'),
      warning: (msg: string) => (window as any).__showAppToast?.(msg, 'warning'),
      confirm: (options: ConfirmOptions | string) => {
        if (typeof window !== 'undefined' && (window as any).__showAppConfirm) {
          return (window as any).__showAppConfirm(options);
        }
        return Promise.resolve(window.confirm(typeof options === 'string' ? options : options.message));
      },
      modalAlert: (options: ModalAlertOptions | string) => {
        if (typeof window !== 'undefined' && (window as any).__showAppAlert) {
          return (window as any).__showAppAlert(options);
        }
        window.alert(typeof options === 'string' ? options : options.message);
        return Promise.resolve();
      }
    };
  }
  return context;
};
