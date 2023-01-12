import express from "express";
import { mockDataIntoDb, getTagData } from "../controllers/dialogflowController";
const router = express.Router()

/**
 * @swagger
 * /mockData:
 *  get:
 *      tags:
 *          - Building Permits and Inspection demo
 *      security: []
 *      summary: Inserts mock data in to firebase
 *      description: Update data into firebase
 *      responses:
 *             200:
 *                description: "Success"
 */
router.get('/mockData', mockDataIntoDb)


/**
 * @swagger
 * /dialogflow/buildingPermits:
 *  post:
 *      tags:
 *          - Building Permits and Inspection demo
 *      security: []
 *      summary: Fetch data by tag
 *      description: get data by tag name
 *      parameters:
 *          - name: body
 *            in: body
 *            schema:
 *               type: "object"
 *               properties:
 *                        tag:
 *                         type: "string"
 *                         example: "property_information"
 *                        buildingId:
 *                         type: "string"
 *                         example: "afKQZLjiGsrdWwDjsvOb"
 *      responses:
 *             200:
 *                description: "Success"
 */
router.post('/dialogflow/buildingPermits', getTagData)


export default router
