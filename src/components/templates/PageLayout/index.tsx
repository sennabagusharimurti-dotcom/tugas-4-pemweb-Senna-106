import { Outlet, NavLink, Link } from "react-router"
import { ProductProvider } from "../../../context/ProductContext"
import styles from "./styles.module.css"

export default function PageLayout() {
    return (
        <ProductProvider>
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
                <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                        <Link
                            to="/products"
                            className="flex items-center gap-2.5 font-bold text-lg text-slate-900 hover:text-blue-600 transition"
                        >
                            <span className="text-2xl">📦</span>
                            <span className="tracking-tight">Manajemen Produk</span>
                        </Link>
                        <nav className="flex items-center gap-1 sm:gap-2">
                            <NavLink
                                to="/products"
                                end
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                    }`
                                }
                            >
                                📋 Daftar Produk
                            </NavLink>
                            <NavLink
                                to="/products/new"
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                                        isActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                    }`
                                }
                            >
                                ➕ Tambah Produk
                            </NavLink>
                        </nav>
                    </div>
                </header>
                <main className={`${styles.container} flex-1 py-8 max-w-5xl mx-auto w-full px-4 sm:px-6`}>
                    <Outlet />
                </main>
                <footer className="bg-white border-t border-slate-200 py-6 mt-auto text-center text-xs text-slate-400">
                    © 2026 Manajemen Produk • Pemrograman Web Week 12
                </footer>
            </div>
        </ProductProvider>
    )
}
