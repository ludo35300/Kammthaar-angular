FROM nginx:alpine
COPY ./dist /var/www/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]