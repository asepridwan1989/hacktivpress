var express = require('express');
var router = express.Router();
const {addArticle, getListSelf, deleteArticle, getListAll, searchArticle, editArticle, getOneArticle, addComment,addLike} = require('../controllers/article.controller')
const {auth} = require('../middleware/auth')
const images = require('../helper/images')
/* GET users listing. */
// router.post('/',function(req,res){
//   console.log('masukkkkk',req.body)
// })
router.post('/',
    images.multer.single('image'),
    images.sendUploadToGCS,
    addArticle
  )
router.get('/profile', auth, getListSelf)
router.get('/home', getListAll)
router.delete('/:id', auth,deleteArticle)
router.put('/:id', auth, editArticle)
router.get('/search', searchArticle)
router.get('/view/:id', getOneArticle)
router.put('/add-comment/:id', addComment);
router.put('/like/:id', addLike);
module.exports = router;
