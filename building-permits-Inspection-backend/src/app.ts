import express, { Request, Response, Router } from "express"
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'


import routers from "./routers"
import * as pkg from "../package.json"
import errorMiddlware from "./middleware/error"

const PORT = process.env.PORT || 8080

const app = express();

app.use(express.json())

app.use(errorMiddlware)

routers.map((router: Router) => app.use("/api", router))

app.get("/api", (_: Request, res: Response) => {
  return res.status(200).send("OK")
})



//Set up swagger jsdoc
const swaggerDefinition = {
  info: {
    title: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  basePath: '/api/',
  tags: [],
  securityDefinitions: {
    Bearer_Token: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    }
  },
  security: [{
    Bearer_Token: []
  }],
};

const options = {
  //import swagger definition
  swaggerDefinition,
  //Path to api docs
  apis: ['./src/routers/*.ts'],
};

//custom swagger UI options
const swaggerUiOptions = {
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    defaultModelExpandDepth: -1,
    displayRequestDuration: true,
  },
  customSiteTitle: 'web-api'
};

//initilize swagger-jsdoc => returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

//hook swagger-jsdoc provided json spec in swagger-ui-express
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));



app.listen(PORT, () => {
  console.log(`Application listining at ${PORT}`)
})

