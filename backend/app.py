from flask import Flask, request, jsonify
import numpy as np
from sklearn.ensemble import IsolationForest

app = Flask(__name__)

# Create a dummy anomaly detection model.
# In practice, you would train this on real network data.
data = np.random.rand(100, 2)   # Generate sample training data
model = IsolationForest(n_estimators=100)
model.fit(data)

@app.route('/predict', methods=['POST'])
def predict():
    """
    Expects JSON payload like: {"data": [value1, value2]}
    IsolationForest returns -1 for anomaly and 1 for normal.
    """
    try:
        # Convert incoming data to numpy array
        input_data = np.array(request.json['data']).reshape(1, -1)
        prediction = model.predict(input_data)
        result = "Anomaly" if prediction[0] == -1 else "Normal"
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    # host='0.0.0.0' makes the server accessible externally.
    app.run(debug=True, host='0.0.0.0', port=5000)
