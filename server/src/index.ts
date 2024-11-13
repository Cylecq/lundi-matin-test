import express from "express";
import cors from "cors";
import { config } from "./config/app.config";
import { ApiService } from "./services/api.service";
import { ClientController } from "./controllers/client.controller";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Services
const apiService = new ApiService();

// Controllers
const clientController = new ClientController(apiService);

// Routes
app.post("/auth", async (req, res, next) => {
  try {
    const response = await apiService.authenticate(req.body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

app.get("/clients", clientController.getClients.bind(clientController));
app.get("/clients/:id", clientController.getClient.bind(clientController));
app.put("/clients/:id", clientController.updateClient.bind(clientController));

// Error handler
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
