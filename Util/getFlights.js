const { DynamicTool } = require("langchain/tools");
const { Joi } = require("joi"); // Import Joi for input validation
const { flightMod } = require("./flightMod"); // Import your flight module

class GetFlightTool extends DynamicTool {
  constructor() {
    super();
    this.name = "GetFlightTool";
    this.description = "Get flight information for a given period.";
    this.schema = Joi.object({
      fly_from: Joi.string().required(),
      fly_to: Joi.string().required(),
      date_from: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
        .required(),
      date_to: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
        .required(),
      sort: Joi.string().valid("price", "duration", "date").required(),
    });
  }

  async _run(fly_from, fly_to, date_from, date_to, sort) {
    // Call your flight module function
    console.log("iN Get Flight Tool");
    const flights = await flightMod(fly_from, fly_to, date_from, date_to, sort);
    return flights;
  }
}

// getFlightInPeriod("NYC", "LAX", "2023-09-01", "2023-09-30", "price").then(
//   (flights) => console.log(flights)
// );

module.exports = GetFlightTool;
