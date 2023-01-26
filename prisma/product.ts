import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient()

const productData: Prisma.productsCreateInput[] = Array.apply(
    null,
    Array(100)
).map((_, index) => ({
    name:`Dark Jean ${index + 1}`,
    contents:`{"blocks":[{"key":"205q0","text":"this is dark jean number ${index+1}","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id:1,
    image_url:`https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/${(index + 1) % 10 === 0 ? 10 : (index + 1) % 10}.jpg`,
    price:Math.floor(Math.random() * (10000 - 20000) + 20000),
}))

async function main(){
    await prisma.products.deleteMany({})
    for(const p of productData){
        const product = await prisma.products.create({
            data:p,
        })
        console.log(`Created id: ${product.id}`)
    }
}

main()
    .then(async() => {
        await prisma.$disconnect()
    })
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })