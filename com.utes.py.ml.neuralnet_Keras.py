# code link: https://heartbeat.comet.ml/building-a-neural-network-from-scratch-using-python-part-2-testing-the-network-c1f0c1c9cbb0
import csv
import pandas as pd
import numpy as np
from numpy import loadtxt
from tensorflow import keras
from keras.layers import Dense
from keras.models import Sequential, load_model
from keras.optimizers import Adam
# from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split

# define the model
model = Sequential()
model.add(Dense(8, input_shape=(13,)))
model.add(Dense(1, activation='sigmoid'))

#prepare for dataset
# add header names
headers =  ['age', 'sex','chest_pain','resting_blood_pressure',  
        'serum_cholestoral', 'fasting_blood_sugar', 'resting_ecg_results',
        'max_heart_rate_achieved', 'exercise_induced_angina', 'oldpeak',"slope of the peak",
        'num_of_major_vessels','thal', 'heart_disease']

heart_df = pd.read_csv('com.utes.py.ml/heart.dat', sep=' ', names=headers)
#convert imput to numpy arrays
X = heart_df.drop(columns=['heart_disease'])

#replace target class with 0 and 1 
#1 means "have heart disease" and 0 means "do not have heart disease"
heart_df['heart_disease'] = heart_df['heart_disease'].replace(1, 0)
heart_df['heart_disease'] = heart_df['heart_disease'].replace(2, 1)

y_label = heart_df['heart_disease'].values.reshape(X.shape[0], 1)

#split data into train and test set
Xtrain, Xtest, ytrain, ytest = train_test_split(X, y_label, test_size=0.2, random_state=2)


# compile the model
opt = Adam(learning_rate=0.001)
model.compile(optimizer=opt, loss='binary_crossentropy', metrics=['accuracy'])

model.fit(Xtrain, ytrain, epochs=100, verbose=0)
train_acc = model.evaluate(Xtrain, ytrain, verbose=0)[1]
test_acc = model.evaluate(Xtest, ytest, verbose=0)[1]

print("Train accuracy of keras neural network: {}".format(round((train_acc * 100), 2)))
print("Test accuracy of keras neural network: {}".format(round((test_acc * 100),2)))