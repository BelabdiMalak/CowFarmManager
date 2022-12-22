const fs = require('fs');


//get the path to json data folder
const path     = require('path')
const DATA_PATH = path.join(__dirname, '../public/jsonData/')


//we export every request handler to the router


//GET request handlers
module.exports.cow_registration_get    = (req, res) => res.render('cowRegistration', message="")

module.exports.medical_examination_get = (req, res) => res.render('medicalExamination')

module.exports.birth_registration_get  = (req, res) => res.render('birthRegistration', {message:""})

module.exports.milk_production_get     = (req, res) =>  res.render('milkProduction'); 



//GET requests for displaying data lists
module.exports.registration_data_get = (req, res) =>{
    let regData=""
    if(fs.existsSync(DATA_PATH+'RegData.json')){
        regData = fs.readFileSync(DATA_PATH+'RegData.json', 'utf-8');
    }
    res.render('regData', {regData});

}

module.exports.medical_data_get = (req, res) =>{
    let medData = ""
    if(fs.existsSync(DATA_PATH+'MedData.json')){
        medData = fs.readFileSync(DATA_PATH+'MedData.json', 'utf-8');
    }
    res.render('medData', {medData});

}

module.exports.birth_data_get = (req, res) =>{
    let birthData = ""
    if(fs.existsSync(DATA_PATH+'BirthData.json')){
        birthData = fs.readFileSync(DATA_PATH+'BirthData.json', 'utf-8');
    }
    res.render('birthData', {birthData});
    
}

module.exports.milk_data_get = (req, res) =>{
    let milkData = ""
    if(fs.existsSync(DATA_PATH+'MilkData.json')){
        milkData = fs.readFileSync(DATA_PATH+'MilkData.json', 'utf-8');
    }
    res.render('milkData', {milkData});
    
}




//POST request handlers

//function to create json files
let createData = (request,  fileName)=>{

    /* if our json file is already initialized we read the old data than we add the new content
            1: Get old data and parse it into a javaScript object
            2: Add the new data to the list of objects
            3: Create a writable stream and push the updated list and parsed to a json String
        else we push content in a new file
    */

    if (fs.existsSync(DATA_PATH + fileName)) {

        let oldData = JSON.parse(fs.readFileSync(DATA_PATH+fileName));//1
        oldData.push(request.body);//2
        let readFile = fs.createWriteStream(DATA_PATH+fileName, { flags: 'r+' });//3
        readFile.write(JSON.stringify(oldData));//3

    } else {

        let list = [];  list.push(request.body);
        let readFile = fs.createWriteStream(DATA_PATH+fileName);
        readFile.write(JSON.stringify(list))

    }
}

//function to check if the cow_num/mother_num exists
let idExists = (fileName, param) => {

    let includes =false;
    let file = JSON.parse(fs.readFileSync(DATA_PATH+fileName,'utf-8'));

    for(let i=0; i<file.length;i++){
        if( file[i].cow_num == param){includes = true; break;};
    }
    return includes;
}


module.exports.medical_examination_post = (req, res) =>
{ createData(req, 'MedData.json');res.render('medicalExamination');}


module.exports.milk_production_post = (req, res) =>
{createData(req, 'MilkData.json');res.render('milkProduction');}


module.exports.birth_registration_post = (req, res) => {

    let b = false;
    if(fs.existsSync(DATA_PATH+'RegData.json')){//if we have at least one registered cow

        //if the mother is registered so add the birth normally
        if(idExists('RegData.json', req.body.mother_num)){createData(req, 'BirthData.json');
        b = true;
        res.render('birthRegistration',{message:"birth well added"})

        }
    }
    if(!b){
        res.render('birthRegistration',{message:'يرجى تسجيل البقرة الام اولا'})
    }

}



module.exports.cow_registration_post = (req, res) => {

    let hasError = true;
    if (fs.existsSync(DATA_PATH+'RegData.json')) {

        let oldData = JSON.parse(fs.readFileSync(DATA_PATH+'RegData.json','utf-8'));

        if(!idExists('RegData.json', req.body.cow_num)){

            oldData.push(req.body);//2
            let readFile = fs.createWriteStream(DATA_PATH+'RegData.json', { flags: 'r+' });//3
            readFile.write(JSON.stringify(oldData));//3;
            hasError=false;

        }else{
            res.render('cowRegistration',{message:'هذا الرقم محجوز, ادخل رقما اخر'})
        }

    }else{

        let list = [];  list.push(req.body);
        let readFile = fs.createWriteStream(DATA_PATH+'RegData.json');
        readFile.write(JSON.stringify(list));
        hasError=false;

    }
    if(!hasError){res.render('cowRegistration',{message:""})}

}