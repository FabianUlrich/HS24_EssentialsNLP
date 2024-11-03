# Web App Setup

## Frontend

This project uses Yarn for managing frontend dependencies. To get started with the frontend:

1. Install Yarn if you haven't already:
    ```sh
    npm install -g yarn
    ```

2. Navigate to the frontend directory and install dependencies:
    ```sh
    cd app/frontend
    yarn install
    ```

3. Start the development server:
    ```sh
    yarn dev
    ```

## Backend

The backend uses Flask. To set up the backend:

1. Create and use virtual environment, python or conda.

2. Navigate to the backend and install the required dependencies:
    ```sh
    cd app/frontend
    pip install -r requirements.txt
    ```

3. Start the Flask server:
    ```sh
    flask run
    ```