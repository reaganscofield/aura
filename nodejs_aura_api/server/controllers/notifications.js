const NotificationModel = require("../models").Notifications;

module.exports = {

    update(request, response){
        return NotificationModel.findOne({
            where: {
                id: request.params.id
            }
        })
        .then((notify) => {
            if(!notify) return response.status(404).send({ message: `not found!`});
            return notify.update({
                is_arrived: request.body.is_arrived,
                is_on_way:  request.body.is_on_way,
                start_time: request.body.start_time,
                ended_time: request.body.ended_time,
            })
            .then((notification) => response.status(200).send(notification))
            .catch((error) => response.status(400).send(error))
        })
    },

    filter(request, response){
        return NotificationModel.findAll({
            where: {
                agent_id: request.params.agent_id
            }
        })
        .then((notification) => {
            if(!notification) return response.status(404).send({ message: "Notifications Not Found"})
            return response.status(200).send(notification)
        })
        .catch((error) => response.status(400).send(error))
    }
}