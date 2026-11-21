import { Link } from "react-router"
import { TbError404, TbArrowLeft } from "react-icons/tb"

export default function NotFoundPage() {
    return (
        <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <div className="flex justify-center mb-2 text-slate-400">
                <TbError404 className="text-7xl" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Halaman Tidak Ditemukan</h1>
            <p className="text-sm text-slate-500 mt-2 mb-6">
                Maaf, alamat URL yang Anda tuju tidak tersedia atau telah dipindahkan.
            </p>
            <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition shadow-xs"
            >
                <TbArrowLeft className="text-lg" />
                Kembali ke Daftar Produk
            </Link>
        </div>
    )
}
