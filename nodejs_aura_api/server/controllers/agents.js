const AgentModel = require("../models").SecurityAgents;
const VehiculeModel = require("../models").Vehicule;

module.exports = {
    create(request, response){
        const regx_email = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/;
        if(!regx_email.test(request.body.email)){
            response.status(404).send({ invalid_email: "invalid email please enter a valid email" });
        } else {
            AgentModel.findOne({ 
                where: { username: request.body.username } 
            }).then((Agent) => {
                if(!Agent) {
                    return AgentModel.create({
                        username: request.body.username,
                        first_name: request.body.first_name,
                        last_name: request.body.last_name,
                        email: request.body.email,
                        phone_number: request.body.phone_number,
                        current_address_street: request.body.current_address_street,
                        current_address_suburb: request.body.current_address_suburb,
                        current_address_city: request.body.current_address_city,
                        current_address_region: request.body.current_address_region,
                        current_address_country: request.body.current_address_country,
                        current_address_zip: request.body.current_address_zip,
                        is_on_trip: request.body.is_on_trip,
                        is_online: request.body.is_online,
                        company_id: request.body.company_id,
                        vehicule_id: request.body.vehicule_id,
                    })
                    .then((agents) => response.status(200).send(agents))
                    .catch((error) => {
                        console.log("eerrrr ", error)
                    })
                }
                response.status(404).send({ message: "username exists already choose another username"});
            });
        }
    },
    
    list(request, response){
        return AgentModel.findAll({
            where: {
                is_online: true,
                is_on_trip: false
            },
            include: {
                model: VehiculeModel,
                as: "Vehicule"
            }
        })
        .then((agents) => response.status(200).send(agents))
        .catch((error) => console.log("aaa ", error));
    },

    retrieve(request, response){
        return AgentModel.findOne({
            where: {
                username: request.params.username,
                phone_number: request.params.phone_number
            },
            include: {
                model: VehiculeModel,
                as: "Vehicule"
            }
        })
        .then((Agent) => {
            if(!Agent) return response.status(404).send({ message: `${request.params.username} not found!`});
            return response.status(200).send(Agent)
        })
        .catch((error) => response.status(400).send(error));
    },

    update(request, response) {
        return AgentModel.findOne({
            where: { id: request.params.id }
        })
        .then((Agent) => {
            if(!Agent) return response.status(404).send({ message: `${request.params.username} not found!`});
            return Agent.update({
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                phone_number: request.body.phone_number,
                current_address_street: request.body.current_address_street,
                current_address_suburb: request.body.current_address_suburb,
                current_address_city: request.body.current_address_city,
                current_address_region: request.body.current_address_region,
                current_address_country: request.body.current_address_country,
                current_address_zip: request.body.current_address_zip,
                is_on_trip: request.body.is_on_trip,
                is_online: request.body.is_online,
                vehicule_id: request.body.vehicule_id,
            })
            .then((Agent) => response.status(200).send(Agent))
            .catch((error) => response.status(400).send(error));
        })
        .catch((error) => response.status(400).send(error));
    }
}