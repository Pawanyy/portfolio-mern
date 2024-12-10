import AppSidebar from "@/components/AppSidebar";
import { Outlet } from "react-router-dom"
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "../store/themeSlice.js"
import { useSelector, useDispatch } from "react-redux";

export default function Page() {

    const theme = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    }

    return (
        <div className="flex">
            <div className="min-w-72" >
                <AppSidebar className="flex-none font-sans antialiased flex min-h-screen flex-col justify-between border-e bg-white dark:bg-gray-900 dark:border-gray-700" />
            </div>
            <div className="flex-grow">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b dark:border-b-0 px-4">
                    <button className="ml-auto" onClick={handleThemeToggle}>
                        {theme === "light" ? <Sun /> : <Moon />}
                    </button>
                </header>
                <main className="min-h-[calc(100vh-64px)] overflow-y-scroll p-4 dark:bg-gray-700">
                    <Outlet />
                </main>
            </div>
        </div >
    )
}
