import React, { useState } from 'react';

const RegisterBook= ({ onSubmit }) => {
    const [form, setForm] = useState({
        isbn: '',
        title: '',
        author: '',
        genre: '',
        publisher: '',
        publicationYear: '',
        location: '',
        loanStatus: '',
        summary: '',
        availableCopies: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(form);
        }
        setForm({
            isbn: '',
            title: '',
            author: '',
            genre: '',
            publisher: '',
            publicationYear: '',
            location: '',
            loanStatus: '',
            summary: '',
            availableCopies: ''
        });
    };

    return (
    <div className="flex min-h-screen items-center justify-center bg-white p-10">
      <div className="w-full max-w-xl bg-white rounded-lg hover:shadow-2xl transition p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Añadir Libro</h1>
        <p className="text-gray-600 text-center mb-6">Completa los campos para registrar un nuevo libro en la biblioteca.
</p>

        <form onSubmit={handleSubmit}>         
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Título:</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Autor:</label>
                <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <div className="flex gap-4">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Isbn:</label>
                <input
                    type="number"
                    name="isbn"
                    value={form.isbn}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    min="1"
                    required
                />
            </div>   
            <div className="flex-2">
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Género:</label>
                <input
                    type="text"
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Editorial:</label>
                <input
                    type="text"
                    name="publisher"
                    value={form.publisher}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <div className="flex gap-4">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Ciudad:</label>
                <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Disponibilidad:</label>
                <select
                    name="loanStatus"
                    value={form.loanStatus}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                >
                    <option value="">Seleccione una opción</option>
                    <option value="disponible">Disponible</option>
                    <option value="no_disponible">No disponible</option>
                </select>
            </div> 
            </div>           
            <div className="flex gap-4">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Fecha de publicación:</label>
                <input
                    type="number" 
                    name="publicationYear"
                    value={form.publicationYear}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                />
            </div>
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Número de copias:</label>
                <input
                    type="number"
                    name="availableCopies"
                    value={form.availableCopies}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    min="1"
                    required
                />
            </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">Summary:</label>
                <textarea
                    name="summary"
                    value={form.summary}
                    onChange={handleChange}
                    rows={4} // número de filas visibles (puedes cambiarlo a 6, 8, etc.)
                    className="w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-y"
                    required
                />
            </div>
            <button 
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded-lg font-semibold hover:bg-purple-600 transition mt-6"
            >Añadir</button>
        </form>
        </div>
    </div>
    );
};

export default RegisterBook;