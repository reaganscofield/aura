const UsersModel = require("../models").Users;
const PanicsModel = require("../models").Panics;


module.exports = {
    create(request, response){
        const regx_email = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+/;
        if(!regx_email.test(request.body.email)){
            response.status(404).send({ invalid_email: "invalid email please enter a valid email" });
        } else {
            UsersModel.findOne({ 
                where: { username: request.body.username } 
            }).then((User) => {
                if(!User) {
                    return UsersModel.create({
                        username: request.body.username,
                        first_name: request.body.first_name,
                        last_name: request.body.last_name,
                        email: request.body.email,
                        phone_number: request.body.phone_number,
                        address_street: request.body.address_street,
                        address_suburb: request.body.address_suburb,
                        address_city: request.body.address_city,
                        address_region: request.body.address_region,
                        address_country: request.body.address_country,
                        address_zip: request.body.address_zip
                    })
                    .then((users) => response.status(200).send(users))
                    .catch((error) => response.status(400).send(error))
                }
                response.status(404).send({ message: "username exists already choose another username"});
            });
        }
    },

    list(request, response){
        return UsersModel.findAll({
            include: {
                model: PanicsModel,
                as: "panics"
            }
        })
        .then((Users) => response.status(200).send(Users))
        .catch((error) => response.status(400).send(error));
    },

    retrieve(request, response){
        return UsersModel.findOne({
            where: {
                username: request.params.username
            },
            include: {
                model: PanicsModel,
                as: "panics"
            }
        })
        .then((User) => {
            if(!User) return response.status(404).send({ message: `${request.params.username} doesn't exists`});
            return response.status(200).send(User)
        })
        .catch(error => res.status(400).send(error));
    }
}