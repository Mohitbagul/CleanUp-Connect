import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO

# Load the model
model_path = r"C:\Users\devgo\Downloads\classifier_model.h5"
try:
    model = tf.keras.models.load_model(model_path)
except Exception as e:
    print("Error loading the model:", e)
    exit()


image_path = r"C:\Users\devgo\Downloads\plastic bottle.jpg"
img = tf.keras.preprocessing.image.load_img(image_path, target_size=(256, 256))
img_array = tf.keras.preprocessing.image.img_to_array(img)
img_array = tf.expand_dims(img_array, 0) 
class_names = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']


predictions = model.predict(img_array)
predicted_class = np.argmax(predictions[0])
predicted_label = class_names[predicted_class]
print("Predicted Class:", predicted_label)

