import requests

url = "http://127.0.0.1:3000"
files ={'image':open('com.utes.py.js/neuralnet_fromScratchLoss.png','rb')}
r = requests.post(url,files=files)