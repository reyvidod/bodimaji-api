const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

router.get("/article/", async (req, res) => {
  try {
    let article;
    article = await Article.find();
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/article", async (req, res) => {
  const newArticle = new Article(req.body);
  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/article/latest", async (req, res) => {
  try {
    let article;
    article = await Article.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/article/:id", async (req, res) => {
  try {
    let article;
    article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/article/:id", async (req, res) => {
  try {
    const updatedarticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedarticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/article/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    await article.delete();
    res.status(200).json("Article has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
