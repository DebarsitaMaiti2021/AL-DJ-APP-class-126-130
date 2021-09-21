leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0,0,600,500); 
    
    fill("#fa1648");
    stroke("#62abe3");

    if(score_LeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        InNumber_leftWristY=Number(leftWristY);
        remove_decimals=floor(InNumber_leftWristY);
        volume=remove_decimals/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML="volume= "+volume;
    }

    if(score_rightWrist>0.2){
        circle(rightWristX,rightWristY,20);

        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="speed=0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="speed=1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="speed=2x";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY<=500){
            document.getElementById("speed").innerHTML="speed=2.5x";
            song.rate(2.5);
        }   
    }
}

song="";

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_LeftWrist=results[0].pose.keypoints[9].score;
        console.log("score_leftWrist= "+score_LeftWrist);

        score_rightWrist=results[0].pose.keypoints[10].score;
        console.log("score_rightWrist= "+score_rightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftWristX+",leftWristY= "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX= "+rightWristX+",righttWristY= "+rightWristY);
    }
}