import express from "express";
import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { 
    createProductController,
    updateProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    productFilterController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController,
    braintreeTokenController,
    braintreePaymentController,
} from "../controllers/productControllers.js";
import formidable from "express-formidable"

const router=express.Router();


// routes for create product
router.post(
    '/create-product',
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

// update product
router.put(
    '/update-product/:pid',
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

// get products
router.get('/get-product',getProductController);


// single product
router.get('/get-product/:slug',getSingleProductController);

// get photo
router.get('/product-photo/:pid',productPhotoController);

// delete product
router.delete('/delete-product/:pid',deleteProductController)


// filter product
router.post('/product-filters',productFilterController)


// product count for pagination
router.get('/product-count',productCountController)


// product per page
router.get('/product-list/:page',productListController)

// search product
router.get('/search/:keyword',searchProductController);


// find Similar products
router.get('/related-product/:pid/:cid',relatedProductController);


// category wise product
router.get('/product-category/:slug',productCategoryController)


// Payment routes for token
router.get('/braintree/token',braintreeTokenController);

// payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController);


export default router;

