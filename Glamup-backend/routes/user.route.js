//user route
const router = require('express').Router()
const auth = require("../middleware/auth.js")
const userController = require("../controllers/user.controller.js")
const upload = require("../middleware/fileupload.js")

router.post("/user/register", userController.register_user);

router.post("/user/login", userController.login_user);

router.post("/user/emailverification", userController.emailverification);

router.post("/user/emailcheck", userController.emailcheck);

router.post("/admin/register", userController.register_admin);

router.post("/admin/login", userController.login_admin);

router.get("/user", auth.checkAuth, userController.get_user_detail);

router.get("/user/details",  userController.user_detail);

router.put("/user/update/:user",  userController.update_user);

router.put("/user/update-profile/:id",  upload.single("image"), userController.update_user_picture);

router.get("/user/cart", auth.checkAuth, userController.view_cart);

router.put("/user/addtocart/:id",  userController.add_to_cart);

router.post("/user/checkout", userController.checkout_cart);

router.put("/user/emptycart",userController.empty_cart);

router.put("/user/updatepassword",userController.update_password);

router.delete("/user/deleteuser/:id",userController.delete_user);



module.exports = router;
