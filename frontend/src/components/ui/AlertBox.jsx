import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

const variants = {
  success: {
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    title: "Éxito",
    className: "border-green-600 bg-green-50 text-green-800",
  },
  error: {
    icon: <XCircle className="h-5 w-5 text-red-600" />,
    title: "Error",
    className: "border-red-600 bg-red-50 text-red-800",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    title: "Advertencia",
    className: "border-yellow-600 bg-yellow-50 text-yellow-800",
  },
  info: {
    icon: <Info className="h-5 w-5 text-blue-600" />,
    title: "Información",
    className: "border-blue-600 bg-blue-50 text-blue-800",
  },
};

export default function AlertBox({ type = "info", message, onClose }) {
  const variant = variants[type] || variants.info;

  return (
    <Alert className={`relative flex items-center gap-3 rounded-2xl shadow-md p-4 ${variant.className}`}>
      {variant.icon}
      <div className="flex-1">
        <AlertTitle className="font-semibold">{variant.title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {/* Botón de cierre */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
}
