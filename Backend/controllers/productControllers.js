import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js"
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree"
import dotenv from "dotenv"

dotenv.config();

// payment gateway
var gateway=new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});



//  create product
export const createProductController = async (req, res) => {
    try {
        // req.field and req.files is from formidable
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        if (!name) {
            return res.status(500).send({ error: "Name is Required" });
        }
        if (!description) {
            return res.status(500).send({ error: "Description is Required" });
        }
        if (!price) {
            return res.status(500).send({ error: "Price is Required" });
        }
        if (!category) {
            return res.status(500).send({ error: "Category is Required" });
        }
        if (!quantity) {
            return res.status(500).send({ error: "Quantity is Required" });
        }
        if (photo && photo.size > 1000000) {
            return res.status(500).send({ error: "Required is Required and should be less then 1MB" });
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            messaage: "Product Created Successfully",
            products,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            messaage: "Error in creating product"
        })
    }
};


// update product
export const updateProductController = async (req, res) => {
    try {
        // req.field and req.files is from formidable
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        if (!name) {
            return res.status(500).send({ error: "Name is Required" });
        }
        if (!description) {
            return res.status(500).send({ error: "Description is Required" });
        }
        if (!price) {
            return res.status(500).send({ error: "Price is Required" });
        }
        if (!category) {
            return res.status(500).send({ error: "Category is Required" });
        }
        if (!quantity) {
            return res.status(500).send({ error: "Quantity is Required" });
        }
        if (photo && photo.size > 1000000) {
            return res.status(500).send({ error: "Required is Required and should be less then 1MB" });
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {
                ...req.fields, slug: slugify(name)
            },
            { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            messaage: "Product Created Successfully",
            products,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            err,
            messaage: "Error in creating product"
        })
    }
}



// get all products
export const getProductController = async (req, res) => {
    try {
        const product = await productModel.find({}).select("-photo").populate("category").limit(100).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            totalProduct: product.length,
            message: "All products",
            product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: err.messaage
        })
    }
}



// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            messaage: "Single Product Fetched",
            product
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in getting the Single Product",
            error: err.messaage
        })
    }
}


// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in getting the Photo",
            error: err.messaage
        })
    }
}



// delete photo
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(200).send({
            success: false,
            message: "Error in deleting the product",
            error: err.messaage
        })
    }
}



//  filter products
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const product = await productModel.find(args);
        res.status(200).send({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Products",
            error,
        });
    }
}


// product count controllers
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
}


// product list controllers base on page
export const productListController = async (req, res) => {
    try {
        const perPage =6;
        const page = req.params.page ? req.params.page : 1;
        const product = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
}

// search product 
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
}


export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
}

// get products by category
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting products",
        });
    }
}


// payment gateway for api token
export const braintreeTokenController = async (req, res) => {
    try {
        // official doc
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}


// payment
export const braintreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
}