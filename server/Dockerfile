#!/usr/bin/env python

FROM python:3.10-slim

# Set the working directory to /app
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY requirements.txt /app/requirements.txt

# Install the dependencies
RUN pip install -r requirements.txt
# RUN cat requirements.txt | xargs -n 1 pip install

# Copy the application code to the working directory
COPY . /app

# Set the FLASK_CONFIG environment variable
ENV FLASK_APP flask_app.py
ENV FLASK_CONFIG development
ENV FLASK_DEBUG 1

# Expose port 5000
EXPOSE 5000

# Run the app when the container starts
# CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]
CMD ["python", "flask_app.py"]
