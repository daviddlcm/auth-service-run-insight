const {createEventService, getAllEventsService, getEventByIdService, getEventByFutureDateService} = require("../services/events.service")
const addEvent = async(req,res) => {
  try {
    const userId = req.params.id;
    const imgPath = req.files?.file;
    const dateEvent = req.body.date_event;
    //console.log("entro")
    //console.log(req.files);
    // console.log("id", userId);
    //console.log(imgPath)
    //console.log(dateEvent)
    

    const event = await createEventService(userId, imgPath,dateEvent);
    // const event = {
    //   message:"prueba"
    // }
    return res.status(201).json({
      message: "Event created successfully",
      event,
      success: true
    });
  } catch (error) {
    console.log("Error creating event:", error.message);
    return res.status(500).json({
      message: "Error creating event",
      error: error.message,
      success: false
    });
  }
}

const getAllEvents = async (req,res) => {
    try {
        //console.log("Fetching all events");
        const events = await getAllEventsService();
        // const events = {
        //     message:"prueba"
        // }
        return res.status(200).json({
        message: "Events fetched successfully",
        events,
        success: true
        });
    } catch (error) {
        console.log("Error fetching events:", error.message);
        return res.status(500).json({
        message: "Error fetching events",
        error: error.message,
        success: false
        });
    }
}

const getEventById = async(req,res) => {
    try {
        const eventId = req.params.id;
        //console.log("Fetching event with ID:", eventId);
        const event = await getEventByIdService(eventId);
        return res.status(200).json({
            message: "Event fetched successfully",
            event,
            success: true
        });
    } catch (error) {
        console.log("Error fetching event:", error.message);
        return res.status(500).json({
            message: "Error fetching event",
            error: error.message,
            success: false
        });
    }
}
const getEventByFutureDate = async(req,res) => {
    try {
        //console.log("Fetching events with future date");
        //console.log(req.query)
        const {date} = req.query;
        const events = await getEventByFutureDateService(date);
        return res.status(200).json({
            message: "Events fetched successfully",
            events,
            success: true
        });
    } catch (error) {
        console.log("Error fetching events:", error.message);
        return res.status(500).json({
            message: "Error fetching events",
            error: error.message,
            success: false
        });
    }
}


module.exports ={
    addEvent,
    getAllEvents,
    getEventById,
    getEventByFutureDate
}