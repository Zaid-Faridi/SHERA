import os
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing import image_dataset_from_directory

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

# Apply augmentation to dataset rather than embedding inside model
data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal_and_vertical"),
    layers.RandomRotation(0.15),
    layers.RandomZoom(0.1),
])

train_ds = train_ds.map(lambda x, y: (data_augmentation(x, training=True), y))

# Clean CNN model for 100% serialization compatibility
model = models.Sequential([
    layers.Rescaling(1./255, input_shape=(128, 128, 3)),
    
    layers.Conv2D(32, (3, 3), activation='relu', name='conv2d_1'),
    layers.MaxPooling2D((2, 2)),
    
    layers.Conv2D(64, (3, 3), activation='relu', name='conv2d_2'),
    layers.MaxPooling2D((2, 2)),
    
    layers.Conv2D(128, (3, 3), activation='relu', name='conv2d_3'),
    layers.MaxPooling2D((2, 2)),
    
    layers.Conv2D(128, (3, 3), activation='relu', name='conv2d_4'),
    layers.MaxPooling2D((2, 2)),
    
    layers.Flatten(),
    layers.Dropout(0.4),
    layers.Dense(128, activation='relu'),
    layers.Dense(1, activation='sigmoid', name='final_dense')
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

print("Training clean CNN model...")
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=10
)

os.makedirs("models", exist_ok=True)
model.save(MODEL_SAVE_PATH)
print(f"Successfully saved trained CNN model to {MODEL_SAVE_PATH}")
