const productController = require('../controllers/productController');
const router = require('express').Router();


// Create Routes for product
router.post('/create', productController.createProduct);

router.get('/', productController.getAllProducts);
router.get('/published', productController.listPublishedStatus);

router.get('/:id', productController.getProductById);

router.put('/:id', productController.updateProductById);

router.delete('/:id', productController.deleteProductById);



module.exports = router;
