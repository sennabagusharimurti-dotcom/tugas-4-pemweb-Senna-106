import RootPage from "./page"
import { Route, Routes } from "react-router"
import PageLayout from "../src/components/templates/PageLayout"
import ProductsPage from "./products/page"
import ProductDetailPage from "./products/[id]/page"
import NewProductPage from "./products/new/page"
import NotFoundPage from "./not-found/page"

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PageLayout />}>
                <Route index element={<RootPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/new" element={<NewProductPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}
