import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import CronJob from "cron";
import path from "path";
const __dirname = path.resolve();
dotenv.config();
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import nodemailer from 'nodemailer'
import cors from 'cors'
import bodyParser from 'body-parser'
 
var app = express()
app.use(cors())
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
initializeApp({
  credential: cert({
    type: "service_account",
    project_id: "nftalphalive-928d1",
    private_key_id: "ab14348d9ec06771268399287a56b93c716f22cf",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCkBFvW89/X2xQW\nU8ElLb567qTOhxyPWUo51Jga4iiVdFUvwo9tqbB1zHYWrg7DD1DQGDtNUHLQND+d\nna1h1WqtIXgiXTvaHfK5U5p7h4c5vZlswUdSDqyFSLIf/n4U9AcXkZ089T3FVCnG\nHtbIdBZ3h1RX/ex0wnqWCVl1iby2D52WDbPuMmK0pCap0s1b368g99Iqj5ioGAyn\nSSXVpCfAk/+7r27Hxm8fy9gRS8vioTxORE6fQdN/jCtMJrYqRnCe7sVZMqQ+09Ae\nkopHSMomGmbk00NWv/fHCtkuLOhPVx39e4Fn6m41iUXwndM2VqgOayB6k5jYUgXT\nnXUxOaxJAgMBAAECggEAFF79OCKkkecCJO7EnbVDg/m5avRRigVdSHb86FPgFgXz\noaGw1j497jeVkCYQq83ua9YioWzlQbJHl3AyzWSoIfY2+U+qpCHVmIqHdKHF3BhO\nIrmTvd+YMlqv0vT1HG2dpuH9TUmpYSWdpZ+FbjKq6rAae+5MDMlt184z9/sCPvtZ\nH35m989p6zKqDSFqaR57J/J8GDD1mwlFRT2vB3cFABNG5SAVN15Hpn2qejTgkcRn\nxmeXgYXGczhQvzMIqSPa62lJW+1nhhimTW/UENO065w6lNUvslJUWd7y6W3dQpO1\njs8Kc64xxaMRGioWasJWXIvR1Xq7WqHb7ldgJgPdzQKBgQDP5oqEfmUaOdSP7Ho8\nc6hXRMl/S+sx7m7PTCDfcTuMpN57+268CG5zcPh+rP487AajqTjb4X0kyGuqCN8P\nRIgNVw6ju07mGHj2Wn+96ScKsio/6v2EFZELB8D5DYqr7N2FTs66t7h5TvYvs/vm\n9HHYTbemTkdtCaIb3obtks5tlQKBgQDJ9rM4LF4fJGvd6zW3rT3qZAL7xQQgp0g4\nfR4XmtMRN80qm3rU74688DWUCRPEZLCMJilWQljo9kV76GsLzx9TFUvlaeC1ll5c\nTofTbmwq/Py7/KYzYr2CLa245Y2PHATM5cn6SKvAJcmXUYyOuGRC46EPDwHRvLTZ\ngqEwGmWO5QKBgC2oivlILPoSg01MeRf3qpvn3nzXdoLTw4BBTuLjollkB/ygnpQr\nId62i8x+P6OvjlG5I2Se4/YFEigYpKxct6h+Wxe4Vj6QV1h7TZyurMVblY3OFPlC\nJ0WN4WKRB8h0T74sLZiyKpBxt/2IAKWbP7lqcA/VFziqKfEG8QkR+cX1AoGAVCUl\n7GyH1n/NNUuvONTELCj5GT6vho9LxsVSSVFnSRAvueXHmnooxU1rdT8G7ldpOysX\nI+pGsuEQeByQpP3ptir0USP4zI9Wxyys6IlkJdD717Le6B/mhxtS+ushPJPW6CuB\nKHcon8jeod4HKttmYnwGeYiuIF14F/uV/r2wvIUCgYBWT/yjDgWeI2yL1uP5/jW9\nBYlFS3NAq6XYqROyMt4FV40nsN5f4lYm3RL3lcixuMWuDUCURCEQhcHXyypevhwJ\np/lyJVxL+5XH5foDL3ae3rFlaKbycMfwBN7XvTiWA0IKSVWzTSyqSfNU1W1FD3E1\n6bphkzG5WtVJogWccId6gA==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-8qghr@nftalphalive-928d1.iam.gserviceaccount.com",
    client_id: "112286021750786166225",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8qghr%40nftalphalive-928d1.iam.gserviceaccount.com",
  }),
});

const db = getFirestore();


app.post("/featurepost",urlencodedParser, async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nftalphalive@gmail.com", // generated ethereal user
      pass: "dqlgepoqpxurlgmx", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "nftalphalive@gmail.com", // sender address
    to: "nftalphalive@gmail.com", // list of receivers
    subject: "Add Post to Featured", // Subject line
    text: `Project title: ${req.body.title} Project Created By: ${req.body.createdBy}`, // plain text body
  });
  if (info.messageId) {
    res.status(200);
    res.json(info);
  } else {
    res.status(404);
    res.json(info);
  }
});

app.use(express.json());

const job = new CronJob.CronJob("59 23 * * Sun", async function () {
  const citiesRef = db.collection("nfts");
  const snapshot = await citiesRef.get();
  snapshot.forEach(async (doc) => {
    const cityRef = db.collection("nfts").doc(doc.id);
    const res = await cityRef.update({ weeklyUpvoted: 0 });
  });
});
job.start();
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
