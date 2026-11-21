import { useParams, useNavigate, Link } from "react-router"
import { useProducts } from "../../../context/ProductContext"
import { formatRupiah } from "../../../utils/formatRupiah"
import { TbPackage, TbArrowLeft, TbTrash } from "react-icons/tb"

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { getProductById, deleteProduct } = useProducts()

    const productId = Number(id)
    const product = Number.isNaN(productId) ? undefined : getProductById(productId)

    if (!product) {
        return (
            <div className="max-w-md mx-auto text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
                <div className="text-5xl mb-3">⚠️</div>
                <h1 className="text-xl font-bold text-slate-900">Produk Tidak Ditemukan</h1>
                <p className="text-sm text-slate-500 mt-2 mb-6">
                    Produk dengan ID #{id} tidak ditemukan dalam daftar atau telah dihapus.
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

    function handleDelete() {
        if (!product) return
        const confirmDelete = window.confirm(
            `Apakah Anda yakin ingin menghapus produk "${product.name}"?`
        )
        if (confirmDelete) {
            deleteProduct(product.id)
            navigate("/products")
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Breadcrumb Navigasi */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Link to="/products" className="hover:text-blue-600 transition">
                    Daftar Produk
                </Link>
                <span>/</span>
                <span className="text-slate-800 font-semibold">{product.name}</span>
            </nav>

            {/* Kartu Detail Produk */}
            <article className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold mb-3">
                        <TbPackage className="text-base" />
                        <span>ID Produk: #{product.id}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        {product.name}
                    </h1>
                    <p className="text-xl sm:text-2xl font-bold text-blue-100 mt-2">
                        {formatRupiah(product.price)}
                    </p>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="text-xs font-semibold text-slate-400 block mb-1">
                                Kategori
                            </span>
                            <span className="text-sm font-bold text-slate-800">
                                Alat Tulis & Perlengkapan Kantor
                            </span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="text-xs font-semibold text-slate-400 block mb-1">
                                Status Stok
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                Tersedia di Gudang
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-slate-900 mb-2">
                            Informasi Tambahan
                        </h2>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                            Produk ini terdaftar dalam sistem manajemen inventaris Toko Produk.
                            Kualitas dan spesifikasi barang sesuai dengan standar operasional.
                        </p>
                    </div>

                    {/* Tombol Aksi & Navigasi */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                        >
                            <TbArrowLeft className="text-base" />
                            Kembali ke Daftar
                        </Link>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
                        >
                            <TbTrash className="text-base" />
                            Hapus Produk
                        </button>
                    </div>
                </div>
            </article>
        </div>
    )
}
