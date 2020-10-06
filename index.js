//this is the source for the most of the code,https://github.com/victordibia/handtrack.js/
//I made som changes to:
//get the position of hand on screen and accoridng to it the image will move. and some in HTML file.

const video = document.getElementById("myvideo");
const handimg = document.getElementById("handimage");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let nextImageButton = document.getElementById("nextimagebutton");
let updateNote = document.getElementById("updatenote");

let imgindex = 1
let isVideo = false;
let model = null;
var uu=0;
// video.width = 500
// video.height = 400

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            updateNote.innerText = "move your hand left or right"
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = "Please enable video"
        }
    });
}

function toggleVideo() {
    if (!isVideo) {
        updateNote.innerText = "Starting video"
        startVideo();
    } else {
        updateNote.innerText = "Stopping video"
        handTrack.stopVideo(video)
        isVideo = false;
        updateNote.innerText = "Video stopped"
    }
}





trackButton.addEventListener("click", function(){
    toggleVideo();
});



function runDetection() {
    model.detect(video).then(predictions => {
        
        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);

        if (predictions[0]) {
            let midval = predictions[0].bbox[0] 
            gamex = document.body.clientWidth * (midval / video.width)
            
            console.log(midval);    
            if(midval>100){
                
                document.getElementById("x").src = "yellow.png"
                }
            else if (midval<100){
        
        
                document.getElementById("x").src = "red.png"
                }
        }
        }
    });
}



// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    updateNote.innerText = "Loaded Model!"
   
    trackButton.disabled = false
   
});
