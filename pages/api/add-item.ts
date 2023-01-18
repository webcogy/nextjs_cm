// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth:'secret_8b82s9cEfZVvSdCIp19wrrSrpbqURbEhD44VxoFoqSw'
})

const databaseId = 'dce53c75751843d294df5abffdf707d4'


async function addItem(name: string){
  try{
    const response = await notion.pages.create({
      parent:{database_id:databaseId},
      properties:{
        title:[
          {
            text:{
              content:name,
            }
          }
        ]
      }
    })
    console.log(response)
  }catch(error){
    console.error(JSON.stringify(error))
  }
}


type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {name} = req.query

  if(name == null){
    return res.status(400).json({message:'No name'})
  }

  try{
    await addItem(String(name))
    res.status(200).json({message:`Success ${name} added`})
  }catch(error){
    res.status(200).json({ message:`Failed ${name} added`})
  }

}
