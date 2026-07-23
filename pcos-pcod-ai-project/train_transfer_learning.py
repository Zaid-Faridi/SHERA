import os
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV3Small
from tensorflow.keras.preprocessing import image_dataset_from_directory

# Set dataset and output paths
DATASET_DIR = "Dataset"
MODEL_SAVE_PATH = os.path.join("models", "image_model.h5")
IMG_SIZE = (128, 128)
BATCH_SIZE = 32

print("Loading dataset...")
train_ds = image_dataset_from_directory(
    DATASET_DIR,
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

val_ds = image_dataset_from_directory(
    DATASET_DIR,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

class_names = train_ds.class_names
print(f"Class names found: {class_names}")

# Data Augmentation pipeline
data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal_and_vertical"),
    layers.RandomRotation(0.15),
    layers.RandomZoom(0.1),
])

# Build Transfer Learning Model with MobileNetV3
base_model = MobileNetV3Small(
    input_shape=IMG_SIZE + (3,),
    include_top=False,
    weights="imagenet"
)
base_model.trainable = False  # Freeze pre-trained weights for transfer learning

inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
x = layers.Rescaling(1./255)(inputs)
x = data_augmentation(x)
x = base_model(x, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.3)(x)
x = layers.Dense(64, activation="relu")(x)
outputs = layers.Dense(1, activation="sigmoid", name="final_dense")(x)

model = tf.keras.Model(inputs, outputs, name="PCOS_MobileNetV3")

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

model.summary()

print("Training MobileNetV3 model...")
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=10
)

# Unfreeze top layers for fine-tuning
base_model.trainable = True
# Freeze early layers, fine-tune top 20 layers
for layer in base_model.layers[:-20]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

print("Fine-tuning top layers...")
history_fine = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=5
)

# Save the trained model
os.makedirs("models", exist_ok=True)
model.save(MODEL_SAVE_PATH)
print(f"Successfully saved upgraded MobileNetV3 transfer learning model to {MODEL_SAVE_PATH}")
