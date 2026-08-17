# English Practicing

A web application designed to help users practice English grammar and vocabulary, specifically structured around the "Tiếng Anh 8 Global Success" curriculum. The application provides interactive lessons, grammar guides, and practice exercises.

## Tech Stack

- **Frontend**: Vanilla HTML, CSS, and JavaScript. No external frameworks are used, ensuring a lightweight and fast user experience..
- **Backend / Serving**: Vanilla Node.js using the built-in `http` module to serve static files.

## Project Structure

- `index.html`: The main entry point for the application. Contains the structure for the Dashboard, Lessons Overview, and Practice views.
- `app.js`: The core frontend application logic, handling view navigation, dynamic rendering of curriculum data, and interactive exercises.
- `style.css`: The main stylesheet utilizing a custom design system with CSS variables for theming (including light/dark mode support).
- `questions.js`: The question database containing practice exercises and grammar data for various tenses.
- `server.js`: A simple Node.js server script used to serve the static files locally.
- `lumina_learning/`, `lumina_learning_light/`, `select_a_tense_light/`, `practice_exercises_light/`, `practice_results_light/`, `lessons_overview_light/`: Directories containing UI prototypes, mockups, and design system documentation used as references during development.

## How to Run

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Navigate to the project directory**: Open your terminal and navigate to the root of the "English Practicing" project.
3. **Start the server**: Run the following command to start the static file server:
   ```bash
   node server.js
   ```
4. **Access the application**: Open your web browser and navigate to [http://localhost:8080](http://localhost:8080).
