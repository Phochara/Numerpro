# ทุกครั้งที่ build 
FROM node:16
# node run บนรีนุค version 15-alpine
WORKDIR /app
# สร้าง directior(สร้างFolderแล้วเข้าไปในนั้นเลย)+ทำงานใน(cd /app) /app
COPY package.json /app
COPY package-lock.json .
#copy package*.json ลง /app

RUN npm i
#install node 
COPY . /app
#ก็อปทุกอย่างในงานลง /app
CMD [ "npm" ,"start"]
#start
