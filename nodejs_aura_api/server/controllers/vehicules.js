const VehiculeModel = require("../models").Vehicule;
const CompaniesModel = require("../models").Companies;

module.exports = {
    create(request, response){
        return VehiculeModel.create({
            name: request.body.name,
            mark: request.body.mark,
            lincese_number: request.body.lincese_number,
            plate_number: request.body.plate_number,
            company_id: request.body.company_id
        })
        .then((Vehicule) => response.status(200).send(Vehicule))
        .catch((error) => response.status(400).send(error));
    },

    list(request, response){
        return VehiculeModel.findAll({
            include: {
                model: CompaniesModel,
            }
        })
        .then((Vehicules) => response.status(200).send(Vehicules))
        .catch((error) => response.status(400).send(error));
    },

    filter(request, response){
        return VehiculeModel.findAll({
            where: { 
                company_id: request.params.company_id 
            },
            include: {
                model: CompaniesModel,
            }
        })
        .then((Vehicules) => {
            if(!Vehicules) return response.status(404).send({ message: `vehicule not found!`});
            return response.status(200).send(Vehicules)
        })
        .catch((error) => response.status(400).send(error));
    }


}