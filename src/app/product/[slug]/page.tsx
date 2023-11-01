import { prismaClient } from "@/lib/prisma";

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
    return ( <h1>{product.name}</h1> );
}
 
export default ProductDetailsPage;