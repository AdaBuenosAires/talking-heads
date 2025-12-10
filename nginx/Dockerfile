# Nginx Reverse Proxy
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create directories
RUN mkdir -p /app/staticfiles /app/media

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
