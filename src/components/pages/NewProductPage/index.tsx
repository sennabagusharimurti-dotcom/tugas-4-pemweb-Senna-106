import { useState, type FormEvent } from "react"
import { useNavigate, Link } from "react-router"
import { useProducts } from "../../../context/ProductContext"
import Button from "../../atoms/Button"
import { TbArrowLeft, TbPlus } from "react-icons/tb"

export default function NewProductPage() {
    const navigate = useNavigate()
    const { addProduct } = useProducts()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [error, setError] = useState("")

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError("")

        const trimmedName = name.trim()
        const parsedPrice = Number(price)

        if (!trimmedName) {
            setError("Nama produk wajib diisi.")
            return
        }

        if (Number.isNaN(parsedPrice) || !Number.isInteger(parsedPrice) || parsedPrice <= 0) {
            setError("Harga harus berupa bilangan bulat positif lebih dari 0.")
            return
        }

        addProduct({
            name: trimmedName,
            price: parsedPrice,
        })

        // Navigasi kembali ke halaman daftar produk setelah berhasil
        navigate("/products")
    }

    return (
        <div className="max-w-xl mx-auto space-y-6">
            {/* Breadcrumb Navigasi */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Link to="/products" className="hover:text-blue-600 transition">
                    Daftar Produk
                </Link>
                <span>/</span>
                <span className="text-slate-800 font-semibold">Tambah Produk Baru</span>
            </nav>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Tambah Produk Baru</h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Masukkan rincian informasi produk baru untuk ditambahkan ke daftar katalog.
                    </p>
                </div>

                {error && (
                    <div role="alert" className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="productName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Nama Produk <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="productName"
                            type="text"
                            placeholder="Contoh: Penggaris Besi 30cm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="productPrice" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Harga (Rp) <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="productPrice"
                            type="number"
                            min="1"
                            step="1"
                            placeholder="Contoh: 15000"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                            required
                        />
                        <span className="text-[11px] text-slate-400 mt-1 block">
                            Masukkan nominal harga satuan dalam Rupiah (harus &gt; 0).
                        </span>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                        <Link
                            to="/products"
                            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition inline-flex items-center gap-1.5"
                        >
                            <TbArrowLeft className="text-sm" />
                            Batal
                        </Link>
                        <Button type="submit">
                            <span className="inline-flex items-center gap-1">
                                <TbPlus className="text-sm" />
                                Simpan Produk
                            </span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
