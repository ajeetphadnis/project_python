FROM node:20.7
WORKDIR python_apps
COPY /python_apps/package*.json .
COPY . .
RUN npm install
EXPOSE 30015:30015
# EXPOSE 30085:30085
# RUN cd /com.utes.cert.crypto
# CMD [ "node" , "pha_cryptoKeyEncDecSrv.js" ]
