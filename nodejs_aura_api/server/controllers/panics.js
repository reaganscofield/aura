const PanicsModel = require("../models").Panics;
const NotificationModel = require("../models").Notifications;
const UsersModel = require("../models").Users;
const AgentModels = require("../models").SecurityAgents;


module.exports = {
    create(request, response){
        return PanicsModel.create({
            panics_name: request.body.panics_name,
            panics_number: Math.floor(Math.random() * 9000000000) + 1000000000,
            user_id: request.body.user_id,
            company_id: request.body.company_id,
            agent_id: request.body.agent_id,
        })
        .then((Panics) => {
            if(Panics) {

                UsersModel.findOne({
                    where: { id: request.body.user_id }
                }).then((User) => {
                    if(User){
                        const user_address = `${User.address_street}, ${User.address_suburb}, ${User.address_city}, ${User.address_country}`;
                        AgentModels.findOne({
                            where: { id: request.body.agent_id}
                        })
                        .then((Agent) => {
                            if(Agent) {
                                const agent_address = `${Agent.current_address_street}, ${Agent.current_address_suburb}, ${Agent.current_address_city}, ${Agent.current_address_country}`;

                                NotificationModel.create({
                                    to_address:  user_address,
                                    from_address: agent_address,
                                    is_arrived: false,
                                    is_on_way: false,
                                    user_id: User.id,
                                    panic_id: Panics.id,
                                    company_id: request.body.company_id,
                                    agent_id: Agent.id,
                                })
                                .then((notify) =>  { return notify; })
                                .catch((error) =>  { return error; });
                                
                            }
                        })
                        .catch((error) => response.status(400).send(error));
                    }
                })
                .catch((error) => response.status(400).send(error));

                return response.status(200).send(Panics);
            }
            return response.status(404).send({ message: "Something went wrong"})
        })
        .catch((error) => response.status(400).send(error));
    },

    list(request, response){
        return PanicsModel.findAll()
            .then((Panics) => response.status(200).send(Panics))
            .catch((error) => response.status(400).send(error));
    }
}