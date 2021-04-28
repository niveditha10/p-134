status="";
objects=[];
alarm="";

function preload(){
    alarm=loadSound("alarm.mp3"); 
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.position(440,140);
    video=createCapture(VIDEO);
    video.hide();
    detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting baby";
}

function modelLoaded(){
    console.log("model is loaded");
    status=true;
}

function draw(){
    image(video,0,0,400,400);
  
    if(status!=""){
        detector.detect(video,gotResult);
        for ( i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status = Objects Detected";
           if (objects[i].label == "person") {
             document.getElementById("baby_detected").innerHTML = "Baby is Detected";
             alarm.stop();
            } else {
             document.getElementById("baby_detected").innerHTML = "Baby is not Detected";
             alarm.play();
            }
        }
        if (objects.length == 0) {
           document.getElementById("baby_detected").innerHTML = "Baby is not Detected";
           alarm.play();
          }
     }
    }


function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        objects=result;
    }
}
