FROM node:16-alpine AS base

WORKDIR /usr/src/app

# package.json, package-lock.json 파일을 복사해서 넣어줍니다.
COPY package*.json ./

# 필요한 패키지들을 설치해주고
RUN npm install

# 작업했던 파일들을 복사해서 넣어 줍니다.
COPY . .

# 포트는 3000 으로 열어 줍니다.
EXPOSE 3000

# package.json - "start": "vite start --host --port 3000"
CMD [ "npm", "start" ]