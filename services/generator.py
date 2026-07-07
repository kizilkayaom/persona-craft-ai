import os, getpass
from google import genai

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

def call_gemini(prompt, model="gemini-2.5-flash"):
    response = client.models.generate_content(model=model, contents=prompt)
    return response.text