import { NavLink } from "react-router-dom";

export default function Sidebar({ links }) {
  return (
    <aside className="w-56 bg-purple-50 h-screen p-4">
      <nav className="space-y-2">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors 
              ${isActive 
                ? "bg-purple-200 text-purple-900 font-medium" 
                : "hover:bg-purple-100 text-gray-700"}`
            }
          >
            <Icon className="h-5 w-5" />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
