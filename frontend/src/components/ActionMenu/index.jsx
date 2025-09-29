import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuArrow,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"

export default function ActionMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false) // controla el estado del modal

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical size={18} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-36 shadow-lg rounded-xl"
        >
          <DropdownMenuArrow className="fill-white" />

          <DropdownMenuItem
            onClick={onEdit}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Pencil size={16} /> Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpen(true)} // ✅ abre el modal manualmente
            className="flex items-center gap-2 text-red-600 cursor-pointer"
          >
            <Trash2 size={16} /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ Modal controlado */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de eliminar este libro?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El libro será eliminado
              permanentemente de la base de datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={onDelete}
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
