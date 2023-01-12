import { z } from "zod"
import crypto from "crypto"
import { getAllDocuments, saveDocument, getDocsByField } from "../utils/firebase"
import { Building, IBuilding, IPermits, PropertyType } from "../utils/types"
import { MOCK_DATA } from "../utils/data"



export const mockData = async () => {
  MOCK_DATA.map(async (data) => {
    const newBuilding = Building.extend({ id: z.string().optional() })
    newBuilding.parse(data)
    await saveDocument('buildings', data)
  })
  return
}

export const getAllBuildings = async () => {
  const response = await getAllDocuments('buildings')
  return response
}

export const getBuildingById = async (buildingId: string) => {
  const response = await getDocsByField('buildings', "buildingId", buildingId);
  return response
}
