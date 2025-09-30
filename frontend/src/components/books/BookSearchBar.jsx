import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookSearchBar({ search, setSearch }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
      <div className="relative w-full sm:max-w-sm">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <Button variant="outline" className="flex gap-2 w-full sm:w-auto">
        <Filter size={16} /> Filter
      </Button>
      <Button className="bg-purple-600 text-white hover:bg-purple-700 w-full sm:w-auto">
        Add Book
      </Button>
    </div>
  )
}
