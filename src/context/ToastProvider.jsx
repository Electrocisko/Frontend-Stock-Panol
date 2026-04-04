import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext();

export function ToastProvider({ children }) {

  const [toast, setToast] = useState(null);

  const showToast = (mensaje, tipo = "success") => {
    setToast({ mensaje, tipo });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>

      {children}

      {toast && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div
            className={`toast show text-white ${
              toast.tipo === "success" ? "bg-success" : "bg-danger"
            }`}
          >
            <div className="toast-body">
              {toast.mensaje}
            </div>
          </div>
        </div>
      )}

    </ToastContext.Provider>
  );
}