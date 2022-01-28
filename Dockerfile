FROM nginx
COPY ./dist/wordle-angular /usr/share/nginx/html
EXPOSE 80
