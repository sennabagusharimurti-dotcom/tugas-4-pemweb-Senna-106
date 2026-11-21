import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product, ProductValues } from "../types/product"
import ProductModel from "../data/product/model/product-model.ts"

interface ProductContextType {
    products: Product[]
    setProducts: (products: Product[]) => void
    addProduct: (values: ProductValues) => Product
    updateProduct: (id: number, values: ProductValues) => void
    deleteProduct: (id: number) => void
    getProductById: (id: number) => Product | undefined
}

const defaultProducts: Product[] = [
    ProductModel.fromResponse({ id: 1, name: "Pulpen", price: 5000 }).toJSON(),
]

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>(defaultProducts)

    function addProduct(values: ProductValues): Product {
        const nextId =
            products.length > 0
                ? Math.max(...products.map((p) => p.id)) + 1
                : 1
        const newProduct: Product = {
            id: nextId,
            name: values.name.trim(),
            price: Number(values.price),
        }
        setProducts((prev) => [...prev, newProduct])
        return newProduct
    }

    function updateProduct(id: number, values: ProductValues) {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                          ...p,
                          name: values.name.trim(),
                          price: Number(values.price),
                      }
                    : p,
            ),
        )
    }

    function deleteProduct(id: number) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
    }

    function getProductById(id: number): Product | undefined {
        return products.find((p) => p.id === id)
    }

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                getProductById,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider")
    }
    return context
}
