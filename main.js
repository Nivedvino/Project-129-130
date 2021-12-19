Peter_pan_song = "";
Harry_potter_theme_song = "";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function setup() {
    canvas = createCanvas(600, 530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function preload() {
    Peter_pan_song = loadSound("music2.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw() {
    image(video, 0, 0, 600, 530);
    song1 = Peter_pan_song.isPlaying();
    song2 = Harry_potter_theme_song.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if (scorerightwrist > 0.2) {
        circle(rightWrist_x, rightWrist_y, 20);
        Harry_potter_theme_song.stop();
        if (song1== false) {
            song1.play();
            document.getElementById("song_name").innerHTML= "Playing Harry Potter Theme Song";
        }
        if (scoreleftwrist > 0.2) {
            circle(leftWrist_x, leftWrist_y, 20);
            Peter_pan_song.stop();
            if (song2== false) {
                song2.play();
                document.getElementById("song_name").innerHTML= "Playing Peter Pan Song";
            }
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("poseNet Is Initialized");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = " + scoreleftwrist);
        console.log("leftWrist_x = " + leftWrist_x + " leftWrist_y = " + leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scorerightwrist = " + scorerightwrist);
        console.log("rightWrist_x = " + rightWrist_x + " rightWrist_y = " + rightWrist_y);
    }
}