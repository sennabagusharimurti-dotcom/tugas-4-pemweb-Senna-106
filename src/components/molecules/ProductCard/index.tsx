import type { Product } from "../../../types/product"
import { TbPackage, TbArrowRight } from "react-icons/tb"
import Button from "../../atoms/Button"
import { Link } from "react-router"
import { formatRupiah } from "../../../utils/formatRupiah"
import styles from "./styles.module.css"

type Props = { product: Product; onSelect: (id: number) => void }

export default function ProductCard({ product, onSelect }: Props) {
    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <span className={styles.id}>ID: {product.id}</span>
                <TbPackage className={styles.icon} aria-hidden="true" />
            </div>
            <h2 className={styles.name}>{product.name}</h2>
            <p className={styles.price}>{formatRupiah(product.price)}</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
                <Button onClick={() => onSelect(product.id)}>Pilih produk</Button>
                <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition"
                >
                    <span>Detail</span>
                    <TbArrowRight className="text-sm" />
                </Link>
            </div>
        </article>
    )
}
