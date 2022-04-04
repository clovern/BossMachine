const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = req.body.numWeeks;
    let weeklyRevenue = req.body.weeklyRevenue;
    if (!(numWeeks * weeklyRevenue > 1000000)){
      res.status(500).send("new ideas must have a value of at least $100000 to be added");
    }
    next(); 
}

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
