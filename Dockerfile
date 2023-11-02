FROM public.ecr.aws/lambda/nodejs:14

# Copy local code to the container image.
WORKDIR /var/task
COPY . .

# Install production dependencies.
RUN npm install

# Set the CMD to your handler (could be a script, or a shell command)
CMD [ "index.handler" ]
