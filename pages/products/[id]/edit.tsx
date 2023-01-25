import Carousel from 'nuka-carousel/lib/carousel';
import ImageGallery from 'react-image-gallery';
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import Head from 'next/head';
import CustomEditor from '@components/Editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1016/1000/600/',
    thumbnail: 'https://picsum.photos/id/1016/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];



export default function Products(){
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const { id:productId } = router.query
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined)
  // const productId = id


  useEffect(() => {
    if( productId != null ){
      fetch(`/api/get-product?id=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.items?.contents){
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.items.contents))
            )
          )
        }else{
          setEditorState(EditorState.createEmpty())
        }
      })
    }
  }, [productId])

  const handleSave = () => {
    // alert('save')
    if(editorState){
      fetch('/api/update-product', {
        method:"POST",
        body:JSON.stringify({
          id:productId,
          contents:JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          )
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        alert('success')
        /* if(data.items?.contents){
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.items.contents))
            )
          )
        }else{
          setEditorState(
            EditorState.createEmpty()
          )
        } */
      })
    }
  }

  // return <ImageGallery items={images} />
  return (
    <>
      <Carousel animation="fade" autoplay withoutControls wrapAround
            slideIndex={index}
            speed={10}
      >
        {images.map(item =>
          <Image
            key={item.original}
            src={item.original}
            alt="image"
            width={1000}
            height={600}
            layout='responsive'
          />
      )}
      </Carousel>
      <div style={{display:'flex'}}>
        {images.map((item, idx) =>
          <div key={idx} onClick={() => setIndex(idx)}>
            <Image src={item.original} alt="image" width={100} height={80} />
          </div>
        )}
      </div>
      {
        editorState != null &&
        <CustomEditor editorState={editorState}
          readOnly={false}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      }
    </>
  )
}