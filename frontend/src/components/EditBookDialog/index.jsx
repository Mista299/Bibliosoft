import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function EditBookDialog({ open, onClose, book, onSave }) {
  const [formData, setFormData] = useState(book || {})

  useEffect(() => {
    setFormData(book || {})
  }, [book])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Editar libro</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Usamos grid para mejor alineación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Autor</label>
              <input
                type="text"
                name="author"
                value={formData.author || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Editorial</label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Año</label>
              <input
                type="number"
                name="publicationYear"
                value={formData.publicationYear || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ISBN</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 text-sm"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <input
                type="text"
                name="genre"
                value={formData.genre || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Copias disponibles</label>
              <input
                type="number"
                name="availableCopies"
                value={formData.availableCopies || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
