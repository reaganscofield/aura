const UsersController = require("../controllers").Users;
const CompaniesController = require("../controllers").Companies;
const VehiculesController = require("../controllers").Vehicules;
const AgentsController = require("../controllers").Agents;
const PanicsController = require("../controllers").Panics;
const NotificationController = require("../controllers").Notification;

module.exports = (app) => {
  
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome Aura API Integration',
  }));

  app.post("/api/users/", UsersController.create);
  app.get("/api/users", UsersController.list);
  app.get("/api/user/:username", UsersController.retrieve);

  app.post("/api/companies/", CompaniesController.create);
  app.get("/api/companies", CompaniesController.list);
  app.get("/api/company/:name/:phone_number", CompaniesController.retrieve);

  app.post("/api/vehicules/", VehiculesController.create);
  app.get("/api/vehicules", VehiculesController.list);
  app.get("/api/vehicules/:company_id", VehiculesController.filter);

  app.post("/api/security_agents/", AgentsController.create);
  app.get("/api/security_agents", AgentsController.list);
  app.get("/api/security_agent/:username/:phone_number", AgentsController.retrieve);
  app.put("/api/security_agents/:id", AgentsController.update);

  app.post("/api/panics/", PanicsController.create);
  app.get("/api/panics", PanicsController.list);

  app.get("/api/notifications/:agent_id", NotificationController.filter);
  app.put("/api/notifications/:id", NotificationController.update);

};