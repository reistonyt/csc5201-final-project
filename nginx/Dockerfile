FROM nginx:alpine

# Remove the default configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose
EXPOSE 80

# Start the server
CMD ["nginx", "-g", "daemon off;"]
