from flask import Flask, request, jsonify
from flask_cors import CORS
from pyngrok import conf, ngrok
import threading
import joblib
import numpy as np

# Load the trained model
model = joblib.load('fare_model.pkl')

# Set up Flask app
app = Flask(__name__)
CORS(app)

# Route to check if the backend is alive
@app.route('/')
def index():
    return "🎉 Backend is working!"

# POST route to get predicted fare
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        # Extract input data from the request body
        input_data = np.array([
            data['baseFare'],
            data['reservationCharge'],
            data['superfastCharge'],
            data['fuelAmount'],
            data['distance'],
            data['duration']
        ]).reshape(1, -1)

        # Make the prediction
        predicted_fare = model.predict(input_data)[0]

        return jsonify({'predictedFare': round(predicted_fare, 2)})

    except Exception as e:
        return jsonify({'error': str(e)})

# Start ngrok tunnel first
conf.get_default().auth_token = "22wZdPa46Q48XybMocYfKV8dCu1x_6voL7Cuygw7dBH7Hk5RmY"  # Replace with your actual token
public_url = ngrok.connect(5000)
print("🔗 Public URL:", public_url)

# Run Flask app in background
def run():
    app.run(port=5000)

thread = threading.Thread(target=run)
thread.start()
