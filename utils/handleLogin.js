require("dotenv").config();
const {IncomingWebhook}=require("@slack/webhook")
require("dotenv").config();

const webhook= new IncomingWebhook(process.env.SLACK_WEBHOOK)


const loggerStream={
    write: message=>{
        webhook.send({
            text:message
        })
    }
}
module.exports=loggerStream