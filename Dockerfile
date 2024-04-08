# Use the official Apache image as the base image
FROM httpd:latest

# Set the working directory inside the container
WORKDIR /usr/local/apache2/htdocs

# Copy the contents of your web application to the working directory
COPY . .

# Expose port 80 to allow external connections
EXPOSE 80
