import { useState, useMemo } from "react"
import { Link } from "react-router"
import Button from "../../atoms/Button"
import ProductRemote from "../../../data/product/source/product-remote.ts"
import ProductRepository from "../../../data/product/repository/product-repository.ts"
import ProductGrid from "../../organisms/ProductGrid"
import { useProducts } from "../../../context/ProductContext"
import { TbPlus, TbSearch } from "react-icons/tb"
import styles from "./styles.module.css"

const repository = ProductRepository(
    ProductRemote({ baseUrl: import.meta.env.VITE_API_BASE_URL ?? "" }),
)

export default function ProductsPage() {
    const { products, setProducts } = useProducts()
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        null,
    )

    const filteredProducts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim()
        if (!query) return products
        return products.filter((p) => p.name.toLowerCase().includes(query))
    }, [products, searchQuery])

    const selectedProduct = products.find(
        (product) => product.id === selectedProductId,
    )

    async function handleLoadProducts() {
        setIsLoading(true)
        setError("")
        setMessage("Memuat produk…")
        try {
            const models = await repository.getProductList()
            setProducts(models.map((model) => model.toJSON()))
            setSelectedProductId(null)
            setMessage(`${models.length} produk berhasil dimuat dari API.`)
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Gagal memuat produk.",
            )
            setMessage("")
        } finally {
            setIsLoading(false)
        }
    }

    function handleSelectProduct(id: number) {
        setSelectedProductId(id)
        setMessage("")
    }

    return (
        <>
            <header className={styles.header}>
                <p className={styles.eyebrow}>Starter pembelajaran React</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className={styles.title}>Manajemen Produk</h1>
                        <p className={styles.description}>
                            Kelola katalog produk, cari barang, dan lihat rincian detail setiap item.
                        </p>
                    </div>
                    <Link
                        to="/products/new"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition shrink-0"
                    >
                        <TbPlus className="text-base" />
                        Tambah Produk Baru
                    </Link>
                </div>
            </header>

            {/* Bar Pencarian & Toolbar API */}
            <div className="space-y-4 my-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="relative flex-1">
                        <TbSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                        <input
                            type="search"
                            placeholder="Cari nama produk..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                        />
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                            {filteredProducts.length} produk
                        </span>
                        <Button onClick={handleLoadProducts} disabled={isLoading}>
                            {isLoading ? "Memuat…" : "Muat dari API"}
                        </Button>
                    </div>
                </div>

                <p className={styles.hint}>
                    Opsional: gunakan backend Anda sendiri. Saat halaman dibuka,
                    tidak ada request API.
                </p>
            </div>

            {error && (
                <p role="alert" className={styles.error}>
                    {error}
                </p>
            )}

            <section aria-label="Contoh daftar produk" aria-busy={isLoading}>
                {products.length === 0 && (
                    <p className={styles.notice}>Belum ada produk dari API.</p>
                )}
                {products.length > 0 && filteredProducts.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 p-6">
                        <p className="text-sm text-slate-500">Tidak ada produk yang cocok dengan pencarian "{searchQuery}".</p>
                    </div>
                )}
                <ProductGrid
                    products={filteredProducts}
                    onSelect={handleSelectProduct}
                />
            </section>

            <p role="status" className={styles.notice}>
                {message ||
                    (selectedProduct
                        ? `Produk dipilih: ${selectedProduct.name}.`
                        : "Klik Pilih produk untuk mempelajari callback dari kartu ke halaman.")}
            </p>
        </>
    )
}
