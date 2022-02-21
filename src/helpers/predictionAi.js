const { PredictionAPIClient } = require("@azure/cognitiveservices-customvision-prediction");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");

const customVisionPredictionKey = process.env.REACT_APP_CUSTOM_VISION_PREDICTION_KEY;
const customVisionPredictionEndPoint = process.env.REACT_APP_CUSTOM_VISION_ENDPOINT;
const projectId = process.env.REACT_APP_CUSTOM_VISION_PROJECT_ID;

const credentials = new ApiKeyCredentials({ inHeader: { "Prediction-key": customVisionPredictionKey } });
const client = new PredictionAPIClient(credentials, customVisionPredictionEndPoint);



export const predictYourImage = async (myImageLink) => {

    const imageURL = myImageLink;

    let resultPrediction;

    await client.classifyImageUrl(projectId, "Iteration1", { url: imageURL })
        .then(result => {
            resultPrediction = result.predictions[0]

            // console.log("The result from url is: ", result);
        })
        .catch(err => {
            console.error("An error occurred:", err);
        });

    return resultPrediction;
}

export const predictYourImageTwo = async (imageData) => {

    var resultPredictionTwo
    await client
        .classifyImage(projectId, "Iteration1", imageData)
        .then(result => {
            resultPredictionTwo = result.predictions[0]

            // console.log("The result from data is: ", result);
        })
        .catch(err => {
            console.error("An error occurred:", err);
        });

    return resultPredictionTwo
}

