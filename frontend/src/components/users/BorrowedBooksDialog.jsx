import React from "react";
import { Button } from "@/components/ui/button";

export default function BorrowedBooksDialog({ open, onClose, user, borrowed = [] }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-2xl p-6 mt-16 md:mt-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Préstamos de {user?.name} ({user?.id})</h3>
          <Button variant="ghost" onClick={onClose}>Cerrar</Button>
        </div>

        {borrowed.length === 0 ? (
          <p className="text-gray-500">No tiene préstamos activos.</p>
        ) : (
          <div className="space-y-3">
            {borrowed.map((b, i) => (
              <div key={i} className="border rounded p-3 bg-gray-50">
                <div className="font-semibold">{b.title ?? b.bookTitle ?? b.isbn}</div>
                <div className="text-sm text-gray-600">ISBN: {b.isbn}</div>
                <div className="text-sm text-gray-600">Prestado: {b.borrowedDate ?? b.startDate}</div>
                <div className="text-sm text-gray-600">Devolver antes de: {b.returnDate ?? b.dueDate}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
