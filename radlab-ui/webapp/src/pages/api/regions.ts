import { NextApiRequest, NextApiResponse } from "next"

import axios from "axios"
import { generateAccessToken } from "@/utils/api"
import { envOrFail } from "@/utils/env"

const projectId = envOrFail(
  "NEXT_PUBLIC_GCP_PROJECT_ID",
  process.env.NEXT_PUBLIC_GCP_PROJECT_ID,
)

const getRegions = async (_: NextApiRequest, res: NextApiResponse) => {
  const token = await generateAccessToken()
  const data = await axios({
    method: "GET",
    url: `https://compute.googleapis.com/compute/v1/projects/${projectId}/regions`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const itemsPage = data.data.items
  if (!itemsPage) {
    return res.status(200).json({ regions: itemsPage })
  }

  const regions: any = []
  itemsPage.forEach((element: any) => {
    const zones = element.zones
    const zonesArray: any = []
    zones.forEach((zone: string) => {
      zonesArray.push(zone.split("/").pop())
    })
    const obj = {
      id: element.id,
      name: element.name,
      zones: zonesArray,
    }
    regions.push(obj)
  })

  return res.status(200).json({ regions: regions })
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (_req.method === "GET") return await getRegions(_req, res)
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({
      result: error,
    })
  }
}

export default handler
