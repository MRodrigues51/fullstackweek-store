import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";

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
        <div>
            <ProductImages imageUrls={product.imageUrls} name={product.name}/>
        </div>
    );
}
 
export default ProductDetailsPage;