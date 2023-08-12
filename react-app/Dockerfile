# 使用官方的Node.js镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 将当前目录的内容复制到容器的/app目录中
COPY package*.json ./

# 安装依赖
RUN yarn install

# 复制其他文件
COPY . .

# 构建应用
RUN yarn build

# 安装serve包
RUN yarn global add serve

# 暴露5000端口（serve默认的端口）
EXPOSE 3000

# 使用serve启动前端应用程序
CMD ["serve", "-s", "build"]
