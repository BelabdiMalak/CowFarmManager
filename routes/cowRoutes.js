//create a router
const express= require('express');
const router = express.Router();


//require the router controller (MVC structure (models, views, controllers))
const cowController = require('../controllers/cowController');


//handle get and post requests for every page
router.get('/cowRegistration'    , cowController.cow_registration_get);
router.post('/cowRegistration'   , cowController.cow_registration_post)

router.get('/medicalExamination' , cowController.medical_examination_get);
router.post('/medicalExamination', cowController.medical_examination_post);

router.get('/birthRegistration'  , cowController.birth_registration_get);
router.post('/birthRegistration' , cowController.birth_registration_post);

router.get('/milkProduction'     , cowController.milk_production_get);
router.post('/milkProduction'    , cowController.milk_production_post);


//get requests to display the json lists
router.get('/regData'  , cowController.regData_get);
router.get('/medData'  , cowController.medData_get);
router.get('/milkData' , cowController.milkData_get);
router.get('/birthData', cowController.birthData_get);


//export the router to the server
module.exports = router;