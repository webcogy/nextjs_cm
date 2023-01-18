// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth:'secret_8b82s9cEfZVvSdCIp19wrrSrpbqURbEhD44VxoFoqSw'
})

const databaseId = 'dce53c75751843d294df5abffdf707d4'


async function getDetail(pageId: string, propertiyId: string){
  try{
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertiyId,
    })
    console.log(response)
    return response
  }catch(error){
    console.error(JSON.stringify(error))
  }
}


type Data = {
  detail?:any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try{
    const {pageId, propertyId} = req.query
    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({detail:response, message:'Success'})
  }catch(error){
    res.status(400).json({message:`failed`})
  }
}
