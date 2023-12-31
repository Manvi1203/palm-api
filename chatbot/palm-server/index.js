require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const { TextServiceClient } =
  require("@google-ai/generativelanguage").v1beta2;

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.API_KEY;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

let answer=null;
let prompt = "Repeat after me: one, two,";

app.post('/api', (req, res) => {
    prompt=req.body.prompt;
    client
    .generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    })
    .then((result) => {
        answer = result[0].candidates[0].output;
        res.json(answer);
      console.log(JSON.stringify(result, null, 2));
    }).catch((err) => {
        console.error(err);
    });
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
