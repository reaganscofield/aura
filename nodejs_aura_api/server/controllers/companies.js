const CompaniesModel = require("../models").Companies;
const VehiculeModel = require("../models").Vehicule;
const AgentModel = require("../models").SecurityAgents;

module.exports = {
    create(request, response){
        const regx_email = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/;
        if(!regx_email.test(request.body.email)){
            response.status(404).send({ invalid_email: "invalid email please enter a valid email" });
        } else {
            return CompaniesModel.create({
                name: request.body.name,
                email: request.body.email,
                phone_number: request.body.phone_number,
                address: request.body.address,
                vat_number: request.body.vat_number
            })
            .then((Companies) => response.status(200).send(Companies))
            .catch((error) => response.status(400).send(error))
        }
    },

    list(request, response){
        return CompaniesModel.findAll({
            include: [
                {
                    model: VehiculeModel,
                    as: "vehicules"
                },
                {
                    model: AgentModel,
                    as: "security_agent"
                }
            ]
        })
        .then((Companies) => response.status(200).send(Companies))
        .catch((error) => response.status(400).send(error));
    },

    retrieve(request, response){
        return CompaniesModel.findOne({
            where: {
                name: request.params.name,
                phone_number: request.params.phone_number
            },
            include: [
                {
                    model: VehiculeModel,
                    as: "vehicules"
                },
                {
                    model: AgentModel,
                    as: "security_agent"
                }
            ]
        })
        .then((Company) => {
            if(!Company) return response.status(404).send({ message: "Company Not Found"})
            return  response.status(200).send(Company)
        })
        .catch(error => res.status(400).send(error));
    }
}