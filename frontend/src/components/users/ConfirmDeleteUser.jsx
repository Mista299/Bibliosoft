import { Button } from "@/components/ui/button";

export default function ConfirmDeleteUser({ open, onClose, onConfirm, user }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-3 text-red-600">
          Eliminar usuario
        </h3>

        <p className="text-gray-700">
          ¿Seguro que deseas eliminar al usuario{" "}
          <span className="font-semibold">{user?.name}</span>?
          <br />
          Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-end gap-3 mt-5">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
