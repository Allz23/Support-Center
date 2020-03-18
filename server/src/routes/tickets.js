const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const Ticket = require("../models/Tickets");

router.get("/tickets", async (req, res) => {
  // We look for admin tickets, or tickets the current user has written. We're hardcoding the admin
  // _id for the moment. TODO: create an AND/OR query
  await Ticket.find({ author: req.user._id }, async function(error, tickets) {
    await User.populate(tickets, { path: "author" }, function(err, tickets) {
      if (err) {
        console.warn(error);
      }
      res.send({
        sentData: tickets
      });
    });
  }).sort({ _id: -1 });
});

router.post("/tickets/new", async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const newTicket = new Ticket({ title, description, author });
    await newTicket.save();

    return res.json({ response: "Ticket added successfully." });
  } catch (error) {
    res.status(403).send(error.message);
  }
});

router.get(`/tickets/:id`, async (req, res) => {
  await Ticket.findById(req.params.id, async (error, ticket) => {
    await User.populate(ticket, { path: "author" }, function(err, pTicket) {
      if (err) {
        console.warn(error);
      }
      return res.json({ sentData: pTicket });
    });
  });
});

module.exports = router;
