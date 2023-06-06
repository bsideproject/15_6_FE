FROM node:16-alpine AS base

WORKDIR /app

# package.json, package-lock.json 파일을 복사해서 넣어줍니다.
COPY package*.json ./

# 필요한 패키지들을 설치해주고
RUN npm install

# 작업했던 파일들을 복사해서 넣어 줍니다.
COPY ./ .

RUN npm run build 

# nginx 이미지를 받는다. 실행 이미지
FROM nginx:1.14.0

# COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
# Remove default nginx static resources
RUN rm -rf ./usr/share/nginx/html/*
# Copies static resources from builder stage
COPY --from=base /app/dist /usr/share/nginx/html/

# 작성한 nginx 설정파일을 복사한다. 
# COPY nginx.conf /etc/nginx/nginx.conf 

# 변경된 설정을 잘 적용하기 위해 재시작한다. 
# RUN service nginx restart 

# 포트는 80 으로 열어 줍니다.
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]