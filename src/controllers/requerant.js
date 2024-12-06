const Requerant = require("../models/requerant");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const moment = require("moment");
const Permit = require("../models/permis");

const addRequerant = asyncHandler(async (req, res) => {
  try {
    let total = 0;
    let amountToPay = 0;
    const categories = req.body.categories;
    const address = {
      avenue: req.body.avenue,
      quartier: req.body.quartier,
      commune: req.body.commune,
    };

    const mapCategories = categories.map((category) =>
      Category.findOne({ _id: category })
    );
    const result = await Promise.all(mapCategories);
    result.map((data, i) => {
      total = total + data.prix;
    });

    if (total <= 20) {
      amountToPay = total + 0;
    } else if (total === 30) {
      amountToPay = total - 10;
    } else if (total === 40) {
      amountToPay = total - 10;
    } else if (total === 50) {
      amountToPay = total + 0;
    }

    var year = moment().format("YY");
    let permitNumber = Number("000");
    let numberPermit = Number(year + permitNumber);

    const permitCheck = await Permit.find();

    if (permitCheck.length !== 0) {
      const lastPermit = permitCheck[permitCheck.length - 1];
      permitNumber = lastPermit.number + 1;
      numberPermit = Number(year + permitNumber);
    }

    const requerant = new Requerant({
      ...req.body,
      adresse: address
    });
    const permit = new Permit({
      ...req.body,
      numberPermit: numberPermit,
      number: permitNumber,
      requerant: requerant._id,
      montantAPayer: amountToPay,
    });
    await requerant.save();
    await permit.save()

    res.status(201).json({
      error: false,
      requerant,
      permit,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message,
    });
  }
});
const getDetails = asyncHandler(async (req, res) => {
  try {
    const requerant = await Requerant.findById(req.params.id).populate([
      "categorie",
    ]);

    res.status(200).json({
      error: false,
      requerant,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message,
    });
  }
});

const getAllRequerantsNA = asyncHandler(async (req, res) => {
  try {
    const requerants = await Requerant.find({ isPaid: false }).populate([
      "categorie",
    ]);

    res.status(200).json({
      error: false,
      requerants,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message,
    });
  }
});

const getAllRequerantsAP = asyncHandler(async (req, res) => {
  try {
    const requerants = await Requerant.find({ isPaid: true }).populate([
      "categorie",
    ]);

    res.status(200).json({
      error: false,
      requerants,
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.message,
    });
  }
});

const apurementPermis = asyncHandler(async (req, res) => {
  try {
    const permis = await Requerant.findByIdAndUpdate(req.params.id, {});
  } catch (e) {}
});

module.exports = { addRequerant, getDetails };
