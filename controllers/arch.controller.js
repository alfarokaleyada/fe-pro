// --------req model file which is DB  ------- //
const Arch = require("../models/arch.model");


let multer = require('multer'),
    express = require('express'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

const DIR = './public';
const archController = {};



// -------- user multer   ------- //

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// -------- user controller   ------- //

    /**
     * sign up logic
     */
    archController.get =   async  (req, res, next) => {
        const {user} = req ;
        const query = {
            user :user._id           
        }
        console.log("archController.get one")

    try{
        const result = await Arch.find(query);
        console.log(result)
        return res.send ({
            arch: result 
        })

    } catch(e) {
        next(e);

    }
    console.log(result)

    };

console.log("Before archController.Post ")

 // ------------ Post ------------ //
 archController.create =   router.post ('/arch', upload.single('profileImg'), async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const {name, place , area,description ,image ,Day, created,profileImg,hight } = req.body;

    const newArach = new Arch({
        name,place,area,description,image,hight,created,Day,
        user:req.user,
        profileImg: url + '/public/' + req.file.filename
    });

     try {
        const saved = await newArach.save();
        return res.send({
            success:true,
            arch: saved
        })
          }catch(e){
            next(e);
        }
     })


 // ------------ update ------------ //
 archController.update = async (req, res, next) => {
   
// call the id and pro 
    const archId = req.params.arch_id;
    const {name, place , area,description ,image , created} = req.body;


// try do update
    try {
               
        // update if it is the same user    
        const arch = await Arch.update({_id: archId}, {name, place , area,description ,image , created})
        res.send({
            success:true + "updated" 
        })
        }catch(e){
            next(e);
        
        }
    
    }

 archController.destroy = async (req, res, next) => {
     console.log("test one")
    const archId = req.params.arch_id;
    console.log("test two")

    try {
        await Arch.deleteOne({_id: archId})
        res.send({
            success:true + "Deleted" 
        })
    }catch(e){
        next(e);
        }
 
}





module.exports = archController;

