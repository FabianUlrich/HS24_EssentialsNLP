# Stage 1: Build the frontend
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY ./app/frontend/package*.json ./
RUN npm install
COPY ./app/frontend .
RUN npm run build

# Stage 2: Backend with PyTorch support and nginx
FROM python:3.11-slim-bullseye AS final
WORKDIR /app

# Install system dependencies for nginx and supervisor
RUN apt-get update && apt-get install -y nginx supervisor && rm -rf /var/lib/apt/lists/*

# Copy the backend app and install Python dependencies
COPY ./app/backend /app/backend
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy the frontend build to nginx html directory
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy configuration files
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./supervisord.conf /etc/supervisord.conf

# Expose the necessary port
EXPOSE 80

# Command to run supervisor, which will manage nginx and waitress
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
