const express= require('express');
const router= express.Router();
const mongoose = require ('mongoose');
const Video = require ('../models/videos');
const db="mongodb://modimanan91:swamishreeji@ds255797.mlab.com:55797/vedioplayer1"
mongoose.Promise=global.Promise;
mongoose.connect(db,function(err){
    if(err){
        console.log("Error!"+err);
    }
});

router.get('/videos', (req,res)=>{
console.log("got request for all videos");
Video.find({})
.exec(function(err,videos){
    if(err){
        console.log("error while getting vedios");

    }else{
        res.json(videos);
    }
});

});
router.get('/videos/:id', (req,res)=>{
console.log("got request for single video");
Video.findById(req.params.id)
.exec(function(err,video){
    if(err){
        console.log("error while getting vedios");

    }else{
        res.json(video);
    }
});

});
router.post('/video',(req,res)=>{
    console.log('post a vedio')
    var newVideo = new Video();
    newVideo.title= req.body.title;
    newVideo.url= req.body.url;
    newVideo.description= req.body.description;
    newVideo.save((err,insertedvedio)=>{
        if(err){
            console.log("error while inserting vedio")
        }else{
            res.json(insertedvedio);
        }

    })
})
router.put('/video/:id',function (req,res){
    
console.log('update vedio')
console.log(req.body.description);
Video.findByIdAndUpdate(req.params.id,{
    $set:{ title: req.body.title,url: req.body.url,description:req.body.description}
},
{
    new :true
},
function(err,updatedVideo){
    if(err){
        console.log('error updating video');
    }else{
        res.json(updatedVideo)
    }
}
)
})
router.delete('/video/:id', function(req,res){
    console.log('deleting video')
    Video.findByIdAndRemove(req.params.id, function(err,deletedVideo){
        if(err){
            res.send(' Error while deleting  video')
        }else{
            res.json(deletedVideo);
        }
    })
})
module.exports= router;