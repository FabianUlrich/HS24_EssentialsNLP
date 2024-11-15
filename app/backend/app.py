# backend/app.py
from flask import Flask, jsonify, request
from transformers import (
    XLNetTokenizer, XLNetForSequenceClassification,
    BertTokenizer, BertForSequenceClassification,
    RobertaTokenizer, RobertaForSequenceClassification
)
import torch
import re
import os

app = Flask(__name__)

loaded_models = {}
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_model_and_tokenizer(model_name):
    """
    Loads the appropriate model and tokenizer based on the model name.
    """
    if model_name not in loaded_models:
        if model_name == "XLnetwFT":
            model_path = os.path.join(os.path.dirname(__file__), "nlpmodels/XLnetwFT")
            tokenizer = XLNetTokenizer.from_pretrained(model_path)
            model = XLNetForSequenceClassification.from_pretrained(model_path)
        elif model_name == "BertwFT":
            model_path = os.path.join(os.path.dirname(__file__), "nlpmodels/BERTwFT")
            tokenizer = BertTokenizer.from_pretrained(model_path)
            model = BertForSequenceClassification.from_pretrained(model_path)
        elif model_name == "RoBERTawFT":
            model_path = os.path.join(os.path.dirname(__file__), "nlpmodels/RoBERTawFT")
            tokenizer = RobertaTokenizer.from_pretrained(model_path)
            model = RobertaForSequenceClassification.from_pretrained(model_path)
        else:
            raise ValueError(f"Unknown model name: {model_name}")

        model.eval()
        model.to(device)

        # Cache the model and tokenizer
        loaded_models[model_name] = {"model": model, "tokenizer": tokenizer}

    return loaded_models[model_name]["model"], loaded_models[model_name]["tokenizer"]

def split_text_into_sentences(text):
    """
    Splits the input text into individual sentences.
    """
    pattern = r'(?<=[\?\.\!])\s+'
    sentences = [sentence.strip() for sentence in re.split(pattern, text)]  # split and strip sentences
    sentences = [re.sub(r'[ ]{2,}', " ", sentence) for sentence in sentences]  # remove multiple spaces
    sentences = [sentence for sentence in sentences if len(sentence) > 10]  # filter out short sentences
    return sentences

@app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello, World!")

@app.route('/api/classify', methods=['POST'])
def classify_sentiment():
    # Parse the input JSON
    data = request.get_json()
    if 'text' not in data or 'model' not in data:
        return jsonify(error="Missing 'text' or 'model' in request body"), 400

    text = data['text']
    model_name = data['model']

    try:
        model, tokenizer = load_model_and_tokenizer(model_name)

        sentences = split_text_into_sentences(text)

        results = []
        for sentence in sentences:
            # Tokenize and encode the input sentence
            encoding = tokenizer(sentence, return_tensors='pt', padding=True, truncation=True, max_length=128)
            input_ids = encoding['input_ids'].to(device)
            attention_mask = encoding['attention_mask'].to(device)

            # Predict sentiment
            with torch.no_grad():
                outputs = model(input_ids, attention_mask=attention_mask)
                logits = outputs.logits
                predicted_class = torch.argmax(logits, dim=1).item()

            results.append({"sentence": sentence, "predicted_label": predicted_class})

        # Return all results as JSON
        return jsonify(text=text, model=model_name, results=results)

    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
