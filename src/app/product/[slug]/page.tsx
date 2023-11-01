import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import { computeProductTotalPrice } from "@/helpers/products";
import ProductInfo from "./components/product-info";

interface ProductDetailsPageProps {
    params: {
        slug: string
    }
}

const ProductDetailsPage = async ({params: {slug}}: ProductDetailsPageProps) => {
    const product = await prismaClient.product.findFirst({
        where: {
            slug: slug
        }  
    })
    if (!product) {
        return <h1>Product not found</h1>
    }
    return ( 
        <div className="flex flex-col gap-8">
            <ProductImages imageUrls={product.imageUrls} name={product.name}/>
            <ProductInfo product={computeProductTotalPrice(product)}/>
        </div>
    );
}
 
export default ProductDetailsPage;