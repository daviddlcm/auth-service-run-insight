const { User } = require("../models/index");
const { Genders } = require("../models/index");
const { UserStats } = require("../models/index");
const { ExperienceLevel } = require("../models/index");
const { Follows } = require("../models/index");
const { Events } = require("../models/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const {uploadImage} = require("../configs/cloudinary.config")
const fs = require("fs-extra")

const createEventService = async (userId, imgPath, dateEvent) => {
  const t = await User.sequelize.transaction();
  try {
    //console.log(dateEvent)
    const user = await User.findByPk(userId);
    if (!user) {
      
      throw new Error("User not found");
    }
    if(user.rolesId != 1){
      
      throw new Error("User is not an admin");
    }
    
    if(!imgPath){
      throw new Error("Image path is required");
    }

     let image = null;
    if(imgPath ){
      //console.log(imgPath.tempFilePath)
      image = await uploadImage(imgPath.tempFilePath)
      //console.log(image)
    }
    

    const event = await Events.create(
      {
        id_user: userId,
        img_path: image.url,
        date_event: dateEvent,
      },
      { transaction: t }
    );

    //await fs.unlink(imgPath.tempFilePath)
    await t.commit();

    return event;
  } catch (err) {
    //await fs.unlink(imgPath.tempFilePath)
    await t.rollback();
    throw err;
  }finally{
    await fs.unlink(imgPath.tempFilePath)
  }
}

const getAllEventsService = async () => {
    try {
        console.log("Fetching all events");
        const events = await Events.findAll();
        //console.log("Events fetched:", events);
        return events;
    } catch (error) {
        throw new Error("Error fetching events: " + error.message);
    }
}

const getEventByIdService = async (eventId) => {
    try {
        if(!eventId) {
            throw new Error("Event ID is required");
        }
        //console.log("Fetching event with ID:", eventId);
        const event = await Events.findByPk(eventId)
        //console.log(event)
        if (!event) {
            throw new Error("Event not found");
        }

        return event;
    } catch (error) {
        throw new Error("Error fetching event: " + error.message);
    }
}

const getEventByFutureDateService = async (dateUnknown) => {
    try {
        //const todayInUTC = getStartOfMexicoDayUtc();
        const date = new Date(dateUnknown);
        //console.log(date)
        if(!date) {
            throw new Error("Date is required");
        }
        // if(date != Date.parse(date)) {
        //     throw new Error("Invalid date format");
        // }

        const futureEvents = await Events.findAll({
            where: {
                date_event: {
                    [Op.gte]: date
                }
            },
            order: [['date_event', 'ASC']]
        });

        return futureEvents;
    } catch (error) {
        throw new Error("Error fetching future events: " + error.message);
    }
}

// const getStartOfMexicoDayUtc = () => {
//   // Crea un DateTime en la zona horaria de México, a la medianoche local
//   const mexicoMidnight = DateTime.now()
//     .setZone("America/Mexico_City")
//     .startOf("day");

//   // Convierte a UTC (devuelve un objeto DateTime en UTC)
//   const mexicoMidnightUtc = mexicoMidnight.toUTC();

//   return mexicoMidnightUtc.toJSDate(); // convierte a objeto Date de JS
// };



module.exports ={
    createEventService,
    getAllEventsService,
    getEventByIdService,
    getEventByFutureDateService
}