import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import app from "../app.js";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Maets API",
      version: "1.0.0",
      description: "Documentation API Maets - SQL + NoSQL"
    },
    servers: [{ url: "http://localhost:3000" }]
  },
  apis: ["./routes/*.js"]
};

const specs = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

console.log("📘 Swagger disponible sur http://localhost:3000/docs");
