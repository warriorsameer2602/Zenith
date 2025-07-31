import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';

const ai = new GoogleGenAI({ apiKey: "AIzaSyDGm_3HU1wxhwRvM8MBAQWyQfh60FwDfAE" });

const History=[];

async function Chatting(userProblem) {
     History.push({
        role:'user',
        parts:[{text:userProblem}]
    })

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: History
  });
History.push({
    role:'model',
    parts:[{text:response.text}]
})

  console.log("\n");
  console.log(response.text);
}
async function main(){

    const userProblem = readlineSync.question("Ask me anything-->");
        await Chatting(userProblem);
        main();
    
}
main();