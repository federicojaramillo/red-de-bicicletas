FROM node:16-alpine AS build

WORKDIR /app

COPY . .

RUN npm ci --legacy-peer-deps

RUN npm run build

# ENV NODE_ENV production

# EXPOSE 3000

# CMD [ "npx", "serve", "build" ]

# production environment
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx","-g", "daemon off;"]