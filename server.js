const express=require("express");
const OpenAI=require("openai");

const app=express();

app.use(express.urlencoded({extended:true}));

const openai=new OpenAI({
 apiKey:process.env.OPENAI_API_KEY
});

app.post("/whatsapp",async(req,res)=>{

const userMessage=req.body.Body;

const response=await openai.chat.completions.create({
model:"gpt-5",
messages:[
{
role:"system",
content:`
You are Nordic Car Detailing assistant.

Services:
- Full Interior & Exterior Deep Clean
- Helsinki
- Espoo
- Vantaa
- Phone: 0453246990

Help customers book appointments.
`
},
{
role:"user",
content:userMessage
}
]
});

const reply=response.choices[0].message.content;

res.send(`
<Response>
<Message>${reply}</Message>
</Response>
`);

});

app.listen(process.env.PORT||3000);
