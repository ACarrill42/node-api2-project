// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.find(req.query)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    res.status(500).json({message: `The posts info could not be retrieved, ${error}`});
  })
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({message: 'the post witht the specified Id does not exist'})
    }
  })
  .catch(error => {
    res.status(500).json({message: `The post with the info could not be retrieved, ${error}`})
  })
});

router.post('/', (req, res) => {
  Posts.insert(req.body)
  .then(post => {
    if(!post.title || !post.contents) {
      res.status(400).json({message: 'Please provide title and content for post'})
    } else {
      res.status(201).json(post)
    }
  })
  .catch(error => {
    res.status(500).json({message: `There was an error while saving the post to the database, ${error}`})
  })
});

router.put('/:id', (req, res) => {
  const change = req.body;
  Posts.update(req.params.id, change)
  .then(postChange => {
    if(!postChange.id) {
      res.status(404).json({message: 'The post with the specified ID does not exist'})
    } else if (!postChange.title || !postChange.contents) {
      res.status(400).json({message: 'Please provide title and contents for the post'})
    } else {
      res.status(200).json(postChange);
    }
  })
  .catch(error => {
    res.status(500).json({message: `The post info could not be modified, ${error}`});
  })
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(removePost => {
    if(!removePost) {
      res.status(400).json({message: 'The post with the Id does not exist'})
    } else {
      res.status(200).json(removePost)
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.query.id)
  .then(comment => {
    if(!comment) {
      res.status(404).json({message: 'The post with the Id does not exist'})
    } else {
      res.status(200).json(comment)
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

module.exports = router;