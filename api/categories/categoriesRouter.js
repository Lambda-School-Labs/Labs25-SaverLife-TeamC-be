const express = require('express');

const Categories = require('./categoriesModel.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Try asking for the id of the category id you would like',
  });
});

//allow a user to read a specific category
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Categories.getCategoryById(id)
    .then((ret) => {
      res.status(200).json(ret);
    })
    .catch(() => {
      res.status(404).json({ message: 'Could not locate by category id' });
    });
});

//allow a user to create a category
router.post('/', (req, res) => {
  const data = req.body;

  // does not return the id of the newly created entry
  Categories.addCategory(data)
    .then(() => {
      res.status(201).json({ message: 'Entry succesfully created!' });
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to create category' });
    });
});

// //update a given line
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Categories.getCategoryById(id)
    .then((line) => {
      if (line) {
        Categories.updateCategory(changes, id).then((ret) => {
          res.json(ret);
        });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to update category' });
    });
});

// //delete a category
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Categories.deleteCategory(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find category with given id' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to delete category' });
    });
});

module.exports = router;