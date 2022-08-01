//product route update
const router = require("express").Router();
const auth = require("../middleware/auth.js");
const productController = require("../controllers/product.controller.js");
const upload = require("../middleware/fileupload.js");

router.get("/product/get", productController.get_products);

router.post("/product/add", upload.single("image") , productController.add_product);

// router.put(
//   "/product/image/:id",
//   upload.single("image"),
//   productController.upload_image
// );

router.put("/product/edit/:id",  productController.update_product);

router.delete("/product/delete/:id", productController.delete_product);

router.get("/product/view/:id", productController.view_product);


router.post(
  "/product/comment/add",
  
  productController.write_comment
);

router.put(
  "/product/comment/edit/:id",
  auth.checkAuth,
  productController.edit_comment
);

router.delete(
  "/product/comment/delete/:id ",
  auth.checkAuth,
  productController.delete_comment
);
router.delete(
  "/order/delete/:id",
 
  productController.delete_order
);

router.get(
  "/product/comment/view/:id",
  
  productController.get_comments
);
router.get(
  "/orders",
  
  productController.get_order
);

module.exports = router;
