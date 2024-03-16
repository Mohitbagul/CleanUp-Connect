from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO

app = Flask(__name__)

# Load the pre-trained model
model = tf.keras.models.load_model(os.getenv('MODEL_PATH'))
def preprocess_image(image_bytes):
    img = Image.open(BytesIO(image_bytes))
    img = img.resize((256, 256))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    return img_array
    

# Define endpoint for classification
@app.route('/classify', methods=['Get','POST'])
def classify():
    # Receive image data from the request
    image_file = request.files['file']
    image_bytes = image_file.read()

    # Preprocess the image
    processed_image = preprocess_image(image_bytes)

    # Perform classification using the model
    class_names = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

    predictions = model.predict(processed_image)
    predicted_class = np.argmax(predictions[0])
    predicted_label = class_names[predicted_class]
    print("Predicted Class:", predicted_label)

    # Return the predicted class
    return jsonify({'prediction': predicted_label})

if __name__ == '__main__':
    app.run(debug=True, port = 5500)