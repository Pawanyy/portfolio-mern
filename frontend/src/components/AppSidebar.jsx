import {
  Briefcase,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  Hammer,
  LayoutDashboard,
  Mail,
  Settings,
  Tag,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice.js";

const sidebarItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Tags", href: "/admin/tags", icon: Tag },
  { name: "Categories", href: "/admin/categories", icon: FolderKanban },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
  { name: "Resume", href: "/admin/resume", icon: FileSpreadsheet },
  { name: "Contact", href: "/admin/contact", icon: Mail },
  { name: "Global Settings", href: "/admin/settings", icon: Settings },
  { name: "Build Requests", href: "/admin/builds", icon: Hammer },
];

export default function AppSidebar({ className }) {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigateTo("/login");
  };

  return (
    <div className={className}>
      <div className="px-4 py-2">
        <ul className="mt-2 space-y-1">
          <li className="h-14">
            <div className="ps-4 font-bold text-3xl">Admin</div>
          </li>
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700 ${
                  item.href === location.pathname
                    ? "bg-gray-200 text-gray-700"
                    : ""
                }`}
              >
                <span className="flex space-x-2">
                  <item.icon />
                  <span>{item.name}</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <button
              className="block w-full rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-200 hover:text-red-700"
              onClick={handleLogout}
            >
              <div className="flex space-x-2">
                <LogOut /> <span>Logout</span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
