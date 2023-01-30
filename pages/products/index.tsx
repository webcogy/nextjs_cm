import { products } from '@prisma/client';
import Image from 'next/image';
import {useEffect, useState} from 'react';

const TAKE = 9
export default function Products(){
    const [skip, setSkip] = useState(0)
    const [products, setProducts] = useState<products[]>([])

    useEffect(() => {
        fetch(`/api/get-products?skip=0&take=${TAKE}`)
            .then(res => res.json())
            .then(data => setProducts(data.items))
    }, [])

    return(
        <div style={{fontSize:16, marginTop:36, marginBottom:36}}>
            {
                products &&
                products.map((item) => (
                    <div key={item.id}>
                        <Image
                            src={item.image_url ?? ''}
                            width={200}
                            height={100}
                            alt={item.name}
                        />
                        <span>{item.name}</span>
                        <span>{item.price.toLocaleString('ko-KR')}원</span>
                        <span>{item.category_id === 1 && '의류'}</span>
                    </div>
                ))
            }
        </div>
    )
}