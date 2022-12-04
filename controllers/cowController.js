const fs = require('fs');


//get the path to json data folder
const path     = require('path')
const dataPath = path.join(__dirname, '../public/jsonData/')


//we export every request handler to the router


//GET request handlers
module.exports.cow_registration_get = (req, res) => {res.render('cowRegistration', message="");}

module.exports.medical_examination_get = (req, res) => { res.render('medicalExamination'); }

module.exports.birth_registration_get = (req, res) => { res.render('birthRegistration', {message:""})}

module.exports.milk_production_get = (req, res) => { res.render('milkProduction'); }



//GET requests for displaying data lists
module.exports.regData_get = (req, res) =>{

    if(fs.existsSync(dataPath+'RegData.json')){
        var regData = fs.readFileSync(dataPath+'RegData.json', 'utf-8');
    }else {var regData=""}
    res.render('regData', {regData});

}

module.exports.medData_get = (req, res) =>{

    if(fs.existsSync(dataPath+'MedData.json')){
        var medData = fs.readFileSync(dataPath+'MedData.json', 'utf-8');
    }else {var medData=""}
    res.render('medData', {medData});

}

module.exports.birthData_get = (req, res) =>{

    if(fs.existsSync(dataPath+'BirthData.json')){
        var birthData = fs.readFileSync(dataPath+'BirthData.json', 'utf-8');
    }else {var birthData=""}
    res.render('birthData', {birthData});
    
}

module.exports.milkData_get = (req, res) =>{

    if(fs.existsSync(dataPath+'MilkData.json')){
        var milkData = fs.readFileSync(dataPath+'MilkData.json', 'utf-8');
    }else {var milkData=""}
    res.render('milkData', {milkData});
    
}




//POST request handlers

//function to create json files
var createData = (request,  fileName)=>{

    /* if our json file is already initialized we read the old data than we add the new content
            1: Get old data and parse it into a javaScript object
            2: Add the new data to the list of objects
            3: Create a writable stream and push the updated list and parsed to a json String
        else we push content in a new file
    */

    if (fs.existsSync(dataPath+ fileName)) {

        var oldData = JSON.parse(fs.readFileSync(dataPath+fileName));//1
        oldData.push(request.body);//2
        var readFile = fs.createWriteStream(dataPath+fileName, { flags: 'r+' });//3
        readFile.write(JSON.stringify(oldData));//3

    } else {

        var list = [];  list.push(request.body);
        var readFile = fs.createWriteStream(dataPath+fileName);
        readFile.write(JSON.stringify(list))

    }
}

//function to check if the cow_num/mother_num exists
var includes_num = (fileName, param) => {

    var includes =false;
    var file = JSON.parse(fs.readFileSync(dataPath+fileName,'utf-8'));

    for(var i=0; i<file.length;i++){
        if( file[i].cow_num == param){includes = true; break;};
    }
    return includes;
}


module.exports.medical_examination_post = (req, res) =>
{ createData(req, 'MedData.json');res.render('medicalExamination');}


module.exports.milk_production_post = (req, res) =>
{createData(req, 'MilkData.json');res.render('milkProduction');}


module.exports.birth_registration_post = (req, res) => {

    var b = false;
    if(fs.existsSync(dataPath+'RegData.json')){//if we have at least one registered cow

        //if the mother is registered so add the birth normally
        if(includes_num('RegData.json', req.body.mother_num)){createData(req, 'BirthData.json');
        b = true;
        res.render('birthRegistration',{message:"birth well added"})

        }
    }
    if(!b){
        res.render('birthRegistration',{message:'يرجى تسجيل البقرة الام اولا'})
    }

}



module.exports.cow_registration_post = (req, res) => {

    var b = false;
    if (fs.existsSync(dataPath+'RegData.json')) {

        var oldData = JSON.parse(fs.readFileSync(dataPath+'RegData.json','utf-8'));

        if(!includes_num('RegData.json', req.body.cow_num)){

            oldData.push(req.body);//2
            var readFile = fs.createWriteStream(dataPath+'RegData.json', { flags: 'r+' });//3
            readFile.write(JSON.stringify(oldData));//3;
            b=true;

        }else{
            res.render('cowRegistration',{message:'هذا الرقم محجوز, ادخل رقما اخر'})
        }

    }else{

        var list = [];  list.push(req.body);
        var readFile = fs.createWriteStream(dataPath+'RegData.json');
        readFile.write(JSON.stringify(list));
        b=true;

    }
    if(b){res.render('cowRegistration',{message:""})}

}