import { Request, Response } from "express"
import { mockData, getAllBuildings, getBuildingById } from "../entities/dialogflow"
import { IBuilding } from "../utils/types"

export const mockDataIntoDb = async (req: Request, res: Response) => {
  try {
    await mockData()
    return res.status(200).send("done")
  } catch (error) {
    res.status(500).send(error)
  }

}



export const getTagData = async (req: Request, res: Response) => {
  /* const { tag } = req.params
  const { buildingId } = req.query */
  const { tag, buildingId } = req.body;
  console.log("Req>>>>>>", req)

  try {
    switch (tag) {
      case 'buildings':
        const buildings = await getAllBuildings()
        res.status(200).json(buildings)
        break
      case 'property_information':
        if (typeof buildingId !== "string") return res.status(400).json({ message: 'Please provide building id' })
        const [property]: IBuilding[] = await getBuildingById(buildingId);
        if (!property) {
          return res.status(400).send("Property not found")
        }
        const myResp = {
          sessionInfo: {
            parameters: {
              imageUrl: property.imageURL,
              zone: property.zone,
              //Land Use - Vacant
              floodZone: property.flood.zone,
              // Districts - 2
            }
          }
        }
        res.status(200).json(myResp)
        break

      default:
        return res.status(400).json({ message: `${tag} not found` })
    }

  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }


}

