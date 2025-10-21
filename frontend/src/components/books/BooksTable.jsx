import { Card, CardContent } from "@/components/ui/card"
import ActionMenu from "../ActionMenu"

export default function BooksTable({ books, onEdit, onDelete }) {
  return (
    <Card className="overflow-x-auto rounded-2xl shadow hidden md:block">
      <CardContent className="p-0">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Autor</th>
              <th className="px-4 py-2">Editorial</th>
              <th className="px-4 py-2">Año</th>
              <th className="px-4 py-2">ISBN</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Copias</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.isbn} className="border-t">
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.publisher}</td>
                <td className="px-4 py-2">{book.publicationYear}</td>
                <td className="px-4 py-2">{book.isbn}</td>
                <td className="px-4 py-2">{book.genre}</td>
                <td className="px-4 py-2">{book.availableCopies}</td>
                <td className="px-4 py-2 text-right">
                  <ActionMenu onEdit={() => onEdit(book)} onDelete={() => onDelete(book.isbn)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
