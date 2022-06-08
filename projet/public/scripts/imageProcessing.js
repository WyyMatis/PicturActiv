let currentImageURL;
let imageArray;

//Function that calculates the angle based on the user's mouse position
function angleCalculation(event)
{
    let image = document.getElementById("image"); // Canvas element where the image is display
    let rectImage = image.getBoundingClientRect(); // Rectangle of the canvas to get origin position

    //Get the mouse position in the page
    let mousePageX = event.clientX;
    let mousePageY = event.clientY;

    //Get the Position of the origin point of the canvas in the page
    let imageX = rectImage.left;
    let imageY = rectImage.top;

    //Get mouse position in canvas
    let mouseImageX = mousePageX - imageX;
    let mouseImageY = mousePageY - imageY;

    //Get the point in the center of the canvas
    let middleImageX = image.clientWidth/2;
    let middleImageY = image.clientHeight/2;

    //Calculation of opposite and adjacent distances
    let oppositeSide = mouseImageY - middleImageY;
    let adjacentSide = mouseImageX - middleImageX;

    //Calculation of the final angle with the "atan2()" function
    //We add PI/2 to move the location of the 0 in the trigonometric circle
    let finalAngle = Math.atan2(oppositeSide,adjacentSide)+Math.PI/2;

    //Call of the image processing function with the new angle
    imageProcessing(finalAngle);
}

// function that search the images from the API
function imageSearch()
{
    let request;

    if (window.XMLHttpRequest) { // Firefox
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) { // IE
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else {
        return alert("XMLHttpRequest unsupported"); // unsupported
    }

    request.open('GET', currentImageURL, false); // Synchro
    request.send(null);

    return request.responseText;
}


// function that get and load the interactive image
function imageProcessing(angle)
{
    let canvas = document.getElementsByTagName('canvas')[0];
    let context = canvas.getContext('2d');

    // file to get the data from
    let xhr = new XMLHttpRequest();
    xhr.open('GET', currentImageURL, true);
    xhr.responseType = 'arraybuffer';

    // processing
    xhr.onload = function(e)
    {
        // get bytes
        let bytes = new Uint8Array(this.response);

        let phi = angle; // image synthesis

        // manage the image size
        // retrieves the size of the image in the header of the .ppm file
        // only manage for images between 100px and 9999px
        let numberFirst = 0; // number in the header of the image ( line 1)
        let retour = imageSearch();
        let getSize = retour.split(/\n/g)[1];
        let tabImageSize = [];
        for (let i =0;i<4;i++) {
            tabImageSize[i] = getSize[i];
        }
        if (tabImageSize[3] === ' ') {
            numberFirst =17;
            tabImageSize.pop();
        }
        else {
            numberFirst = 19;
        }
        let imageSize = tabImageSize.join(''); // transformation array to string with an empty separator ''
        let imageTest = document.getElementById('image');
        imageSize= parseInt(imageSize,10);   // transformation of the string to int
        imageTest.width = imageSize;
        imageTest.height = imageSize;

        // empty buffer to put the data into
        let output = context.createImageData(imageSize, imageSize);
        let w = imageSize, h = imageSize;
        let outputData = output.data;

        // decode each pixel of the image
        for (let y = 1; y < h-1; y += 1)
        {
            for (let x = 1; x < w-1; x += 1)
            {
                let i = numberFirst + (y*w + x)*6;  // input index
                let o = (y*w + x)*4;  // output index
                let e = bytes[i+1];  // energy map...
                let energy = e / 255.0;  // ...decoded
                let o1 = bytes[i+3];  // orientation map MSB...
                let o0 = bytes[i+5]; // orientation map LSB...
                let orientation = -(o1*256+o0)*Math.PI/32678.0-Math.PI;  // ...decoded
                let v = Math.cos(phi)*energy*Math.cos(orientation)+Math.sin(phi)*energy*Math.sin(orientation);  // sythesis
                let image = (v+1)/2;  // normalized pixel

                for (let c = 0; c < 3; c += 1)
                {
                    outputData[o+c] = image*255;
                }
                outputData[(y*w + x)*4 + 3] = 255; // alpha channel
            }
        }

        // put the image data
        context.putImageData(output, 0, 0);
    };

    // send HTTP request
    xhr.send();
}


function manageImageDisplay (imagesArray)
{
    let GMTDate = Date.now();
    let startDate = new Date();
    let endDate = new Date();


    imagesArray.forEach((image) => {

        startDate.setFullYear(image.startDateDisplay[0]);
        startDate.setMonth(image.startDateDisplay[1]-1);
        startDate.setDate(image.startDateDisplay[2]);
        startDate.setHours(image.startDateDisplay[3]);
        startDate.setMinutes(image.startDateDisplay[4]);
        startDate.setSeconds(image.startDateDisplay[5]);

        endDate.setFullYear(image.endDateDisplay[0]);
        endDate.setMonth(image.endDateDisplay[1]-1);
        endDate.setDate(image.endDateDisplay[2]);
        endDate.setHours(image.endDateDisplay[3]);
        endDate.setMinutes(image.endDateDisplay[4]);
        endDate.setSeconds(image.endDateDisplay[5]);

        if (GMTDate > startDate && GMTDate < endDate)
        {
            currentImageURL = image.file;

            let title = document.getElementById('title');
            title.innerHTML = image.title;

            let remaining = new Date(endDate-GMTDate);

            let Hours = new Number((remaining.getHours()-2) + (remaining.getDate()-1)*24);
            let Minutes = new Number(remaining.getMinutes());
            let Seconds = new Number(remaining.getSeconds());

            let timeout= (Hours * 60 * 60 + Minutes * 60 + Seconds)*1000 ;

            let intervalID;
            let timeoutID;

            timeoutID = setTimeout(
                intervalID = setInterval(
                    function () {

                        timeout = timeout - 1000;

                        if(Seconds == 0)
                        {
                            Seconds = 59;
                            if(Minutes == 0)
                            {
                                Minutes = 59;
                                if(Hours == 0)
                                {}
                                else
                                {
                                    Hours --;
                                }
                            }
                            else
                            {
                                Minutes --;
                            }
                        }
                        else
                        {
                            Seconds --;
                        }

                        //management of time
                        //here if the time is equal to 0
                        if (timeout == 0) {
                            location.reload();
                            clearTimeout(timeoutID);
                            clearInterval(intervalID);
                        }
                        else {
                            document.getElementById('timeDisplay').innerHTML = "Temps restant : " + Hours + " Heures " + Minutes + " Minutes " + Seconds + " secondes";
                        }

                    }, 1000
                ), 5000
            );
    }
    })
}

$(document).ready(function ()
{

    let url = "http://localhost:8888/api/images";
    fetch(url).then(function(res)
    {
        if(res.ok)
            return res.json();
    }).then(function(value)
    {
        imageArray = value;
        manageImageDisplay(imageArray);
        imageProcessing(0);
    }).catch(function(err)
    {
        console.error(err);
    });

    $('#image').on('click', angleCalculation);

    let divPopOverTop = document.getElementById('divPopOver');
    $('#infoButton').on('click', function () {divPopOverTop.style.display = "initial"});
    $('#clickableCross').on('click', function () {divPopOverTop.style.display = "none"});

});