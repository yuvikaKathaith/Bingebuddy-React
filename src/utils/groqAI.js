import Groq from "groq-sdk";
import { AI_KEY } from "./constants";

const groq = new Groq({ 
    apiKey: AI_KEY,
    dangerouslyAllowBrowser: true,
});

export default groq;