import { X as XIcon, RotateCcw } from "lucide-react";
function formatDate(dateString) {
  if (!dateString) return null;

  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;

  return d.toLocaleString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BorrowedBooksDialog({ open, user, onClose, onReturnRequest }) {

  // 👉 si el modal está cerrado, no se renderiza
  if (!open) return null;

  if (!user) return null;

  const loans = Array.isArray(user.borrowedBooks) ? user.borrowedBooks : [];

  const safeClose = () => {
    if (typeof onClose === "function") {
      try {
        onClose();
      } catch (err) {
        console.error("Error en onClose():", err);
      }
    }
  };

  const safeReturnRequest = (loan) => {
    if (typeof onReturnRequest === "function") {
      try {
        onReturnRequest(loan);
      } catch (err) {
        console.error("Error en onReturnRequest():", err);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      onMouseDown={safeClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl relative"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={safeClose}
          className="absolute top-3 right-3 p-1 rounded-md hover:bg-gray-100 transition z-50 pointer-events-auto"
        >
          <XIcon className="h-5 w-5 text-gray-600" />

        </button>

        <h2 className="text-xl font-semibold mb-4">Préstamos de {user.name}</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Título</th>
                <th className="px-3 py-2 text-left">Fecha préstamo</th>
                <th className="px-3 py-2 text-left">Fecha devolución</th>
                <th className="px-3 py-2 text-left">Acción</th>
              </tr>
            </thead>

            <tbody>
              {loans.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-4 text-center text-gray-500">
                    No hay préstamos registrados.
                  </td>
                </tr>
              )}

              {loans.map((loan) => (
                <tr key={loan.bookId ?? loan.id} className="even:bg-gray-50">
                  <td className="px-3 py-2 align-top">{loan.title ?? "—"}</td>

                  <td className="px-3 py-2 align-top">
                    {formatDate(loan.borrowedDate) ?? "—"}
                  </td>

                  <td className="px-3 py-2 align-top">
                    {loan.returnDate ? formatDate(loan.returnDate) : "No devuelto"}
                  </td>

                  <td className="px-3 py-2 align-top">
                    {!loan.returnDate ? (
                      <button
                        type="button"
                        onClick={() => safeReturnRequest(loan)}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        <RotateCcw className="h-4 w-4 text-white" />
                        <span className="text-sm">Devolver</span>
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
