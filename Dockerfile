# Étape 1 : Utiliser une image Nginx minimale
FROM node:18-alpine AS build


# Étape 2 : Copier les fichiers Angular buildés dans le dossier Nginx
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Étape 3 : Exposer le port 80
EXPOSE 80

# Étape 4 : Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]