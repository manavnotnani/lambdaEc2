const express = require("express");
const cors = require("cors");
const AWS = require("aws-sdk");

const app = express();
app.use(cors());

AWS.config.update({
  region: "ap-south-1",
});
const lambda = new AWS.Lambda();

app.post("/signatures", (req, res) => {
  const event = req.body;
  const params = {
    FunctionName: "createSignature",
    Payload: JSON.stringify(event),
    InvocationType: "RequestResponse",
  };
  lambda.invoke(params, (err, data) => {
    if (err) {
      console.error("Error invoking Lambda function:", err);
    } else {
      console.log("Lambda function response:", JSON.parse(data.Payload));
    }
  });
  if (data.Payload) {
    return res.json({
      status: 200,
      data: data.Payload,
    });
  }
  return res.json({
    status: 500,
    data: "Something went wrong",
  });
});

app.listen(8080);
