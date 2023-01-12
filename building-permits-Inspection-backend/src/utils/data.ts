import {
  IInspection, IPermits,
  PropertyType, InspectionStatus, InspectionType,
  PermitType, IFlood, IBuilding
} from "../utils/types"
import { Timestamp } from "firebase-admin/firestore"
import crypto from "crypto"

const firebaseTimeStamp = {
  _nanoseconds: Timestamp.now().nanoseconds,
  _seconds: Timestamp.now().seconds
}


const Permit: IPermits = {
  id: crypto.randomUUID().slice(0, 4),
  type: PermitType.Application,
  status: "Approved",
  description: "Permit approved",
  fee: 200,
  issueDate: firebaseTimeStamp,
  expirationDate: {
    _nanoseconds: 0,
    _seconds: 1681279862,
  },
}


const Inspection: IInspection = {
  id: crypto.randomUUID().slice(0, 4),
  dateOfInspection: firebaseTimeStamp,
  inspectorName: "Kenneth E Ebbert",
  inspectionType: InspectionType.Outerly,
  status: InspectionStatus.Approved,
  deficiencies: []
}

const Flood: IFlood = {
  zone: "VE",
  elevation: "14",
  description: "COSTAL HIGH HAZARD AREAS",
  details: "Areas within the 1-percent annual chance Costal floodplain that have additional hazrads associated with storm waves",
}

export const MOCK_DATA: IBuilding[] = [
  {
    buildingId: "1",
    owner: {
      name: "Joshua S Jones",
      email: "carolyn1992@gmail.com"
    },
    zipCode: "33169",
    zone: "T2-86C-O",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kuopio%2C_Apartment_house_in_Kuopio.JPG/220px-Kuopio%2C_Apartment_house_in_Kuopio.JPG",
    clientId: crypto.randomUUID().slice(0, 4),
    address: "16 Pleasant Hill Road",
    yearBuilt: 2018,
    squareFootage: 1253367,
    numberOfFloors: 12,
    propertyType: PropertyType.RESIDENTIAL,
    inspections: [Inspection],
    permits: [Permit],
    flood: Flood
  },
  {
    buildingId: "2",
    owner: {
      name: "Luis W Bunn",
      email: "horace.beat@gmail.com"
    },
    zipCode: "33128",
    zone: "T6-48A-O",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kuopio%2C_Apartment_house_in_Kuopio.JPG/220px-Kuopio%2C_Apartment_house_in_Kuopio.JPG",
    clientId: crypto.randomUUID().slice(0, 4),
    address: "2473 Travis Street",
    yearBuilt: 2015,
    squareFootage: 2053367,
    numberOfFloors: 12,
    propertyType: PropertyType.RESIDENTIAL,
    inspections: [Inspection],
    permits: [Permit],
    flood: Flood
  }
]