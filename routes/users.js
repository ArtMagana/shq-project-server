// This route finds the first user, takes the file from the request with the key 'picture' and save the 'pictureUrl'
router.post('/first-user/pictures', parser.single('picture'), (req, res, next) => {
  User.findOneAndUpdate({}, {
      pictureUrl: req.file.url
    })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
});