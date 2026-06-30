import os
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def train_cnn():
    dataset_dir = "Dataset"
    
    # We have infected and noninfected as classes
    # Because they are just in Dataset/infected and Dataset/noninfected, 
    # we can use Dataset as the root for ImageDataGenerator if it only contains those two. 
    # Wait, there's clinical_data.csv in Dataset too. ImageDataGenerator might ignore non-directories, but to be safe, let's create a temp structure or use tf.keras.utils.image_dataset_from_directory.
    
    img_height = 128
    img_width = 128
    batch_size = 32

    # It's cleaner to use image_dataset_from_directory or filter. 
    # Actually, tf.keras.utils.image_dataset_from_directory is safest, but we want only 'infected' and 'noninfected' classes.
    train_ds = tf.keras.utils.image_dataset_from_directory(
        dataset_dir,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=(img_height, img_width),
        batch_size=batch_size,
        class_names=['infected', 'noninfected'] # Force only these folders
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        dataset_dir,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=(img_height, img_width),
        batch_size=batch_size,
        class_names=['infected', 'noninfected']
    )
    
    # Cache and prefetch
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

    num_classes = 2

    model = models.Sequential([
        layers.Rescaling(1./255, input_shape=(img_height, img_width, 3)),
        layers.Conv2D(16, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(32, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Dropout(0.2),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(1, activation='sigmoid') # Binary classification
    ])

    model.compile(optimizer='adam',
                  loss=tf.keras.losses.BinaryCrossentropy(),
                  metrics=['accuracy'])

    epochs = 10
    print("Training CNN model...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=epochs
    )

    os.makedirs("models", exist_ok=True)
    model_path = os.path.join("models", "image_model.h5")
    model.save(model_path)
    print(f"Image model saved to {model_path}")

if __name__ == '__main__':
    train_cnn()
