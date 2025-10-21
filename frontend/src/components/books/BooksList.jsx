import ActionMenu from "../ActionMenu"

export default function BooksList({ books, onEdit, onDelete }) {
  return (
    <div className="md:hidden space-y-4 p-4">
      {books.map((book) => (
        <div key={book.isbn} className="border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <p className="text-sm">Editorial: {book.publisher}</p>
          <p className="text-sm">Año: {book.publicationYear}</p>
          <p className="text-sm">ISBN: {book.isbn}</p>
          <p className="text-sm">Categoría: {book.genre}</p>
          <p className="text-sm">Copias: {book.availableCopies}</p>
          <div className="flex justify-end mt-2">
            <ActionMenu onEdit={() => onEdit(book)} onDelete={() => onDelete(book.isbn)} />
          </div>
        </div>
      ))}
    </div>
  )
}
