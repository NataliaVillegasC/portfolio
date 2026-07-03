# Builds the full portfolio (webpage + cv + resume) into one static bundle
# served by nginx — the same layout GitHub Pages uses.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY shared/package.json shared/
COPY webpage/package.json webpage/
COPY cv/package.json cv/
COPY resume/package.json resume/
RUN npm ci
COPY . .
# Served at the domain root inside the container
ENV BASE_PATH=""
RUN npm run build \
  && mkdir -p /site/cv /site/resume \
  && cp -r webpage/out/. /site/ \
  && cp -r cv/build/. /site/cv/ \
  && cp -r resume/build/. /site/resume/

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site /usr/share/nginx/html
EXPOSE 80
