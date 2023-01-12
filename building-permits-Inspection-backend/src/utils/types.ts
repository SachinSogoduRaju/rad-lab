import zod from "zod"

export const FirestoreTimestamp = zod.object({
  _nanoseconds: zod.number(),
  _seconds: zod.number(),
})

export type FirestoreTimestamp = zod.infer<typeof FirestoreTimestamp>

export enum PropertyType {
  COMMERCIAL = "commercial",
  RESIDENTIAL = "residential",
  INDUSTRIAL = "industrial",
}

const PropertyTypeEnum = zod.nativeEnum(PropertyType)
//type propertyEnum = zod.infer<typeof propEnum>

export enum InspectionStatus {
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = " Pending"
}

export enum InspectionType {
  MoveIn = "Move-in",
  Outerly = "Quarterly",
  Routine = "Routine",
  DriveBy = "Drive-by",
  MoveOut = "Move-out",
  ChangeOwener = "Change in ownership"
}


const Correction = zod.object({
  correctionId: zod.string().optional(),
  dateCorrected: zod.string().optional(),
  correctiveActionTaken: zod.string().optional()
})

const Corrections = zod.array(Correction)

const Deficiency = zod.object({
  id: zod.string().optional(),
  description: zod.string().optional(),
  priority: zod.string().optional(),
  corrections: Corrections
})

const Deficiencies = zod.array(Deficiency)


const Inspection = zod.object({
  id: zod.string().optional(),
  dateOfInspection: FirestoreTimestamp.optional(),
  inspectorName: zod.string().optional(),
  inspectionType: zod.string().optional(),
  status: zod.string().optional(),
  deficiencies: Deficiencies
})
export enum PermitType {
  Application = "Application",
  PlanReview = " Plan Review",
  PermitIssuance = "Permit Issuance",
  Inspections = "Inspections"
}


const Inspections = zod.array(Inspection)
export type IInspection = zod.infer<typeof Inspection>


const Permit = zod.object({
  id: zod.string().optional(),
  type: zod.string().optional(),
  status: zod.string().optional(),
  description: zod.string().optional(),
  fee: zod.number().optional(),
  issueDate: FirestoreTimestamp.optional(),
  expirationDate: FirestoreTimestamp.optional(),
})

const Permits = zod.array(Permit)
export type IPermits = zod.infer<typeof Permit>

const Flood = zod.object({
  zone: zod.string().optional(),
  elevation: zod.string().optional(),
  description: zod.string().optional(),
  details: zod.string().optional(),
})

export type IFlood = zod.infer<typeof Flood>

const User = zod.object({
  name: zod.string(),
  email: zod.string()
})

export const Building = zod.object({
  buildingId: zod.string(),
  owner: User,
  zipCode: zod.string(),
  zone: zod.string(),
  imageURL: zod.string(),
  clientId: zod.string(),
  address: zod.string(),
  yearBuilt: zod.number(),
  squareFootage: zod.number(),
  numberOfFloors: zod.number(),
  propertyType: PropertyTypeEnum,
  inspections: Inspections,
  permits: Permits,
  flood: Flood,
})

export type IBuilding = zod.infer<typeof Building>