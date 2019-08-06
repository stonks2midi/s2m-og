var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight - 70);

    canvas.parent("graphCanvas");
    rectMode(CENTER);
}

function draw() {
    background(255);

    stroke(255, 0, 0);
    strokeWeight(5);

    var previousData = (window.innerHeight - 70) * (1 - (data[i] / 2));

    for (var i = 0; i < 10; i++) {
        line((window.innerWidth * (i / 12)) - (window.innerWidth / 12), previousData, (window.innerWidth * ((i + 1) / 12)) - (window.innerWidth / 12), (window.innerHeight - 70) * (1 - (data[i] / 2)));

        previousData = (window.innerHeight - 70) * (1 - (data[i] / 2));
    }
}

setInterval(function() {
    var dataIteration = getDummyData("GBP", "EUR", 10);

    var part = dataIteration["Time Series FX (Monthly)"];
    var key = Object.keys(part)[0];
    
    data.push(part[key]["4. close"]);

    data = data.slice(Math.max(data.length - 10, 1));
}, 500);