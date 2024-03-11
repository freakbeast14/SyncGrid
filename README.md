# RealSync Grid

RealSync Grid is a cutting-edge, real-time collaborative data management platform. It leverages the power of WebSockets to enable live data updates across multiple clients, ensuring all users see the same data at the same time. Ideal for team projects, live data analysis, or any scenario where up-to-the-second data synchronization is critical.

## Getting Started

These instructions will guide you through setting up RealSync Grid on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed before proceeding:

- Python 3.8+
- Node.js and npm
- A virtual environment tool like `venv` or `conda` (optional but recommended for Python development)

### Installation

Follow these steps to get your development environment up and running.

#### Setting up the Backend

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/realsync-grid.git
   cd realsync-grid
   ```
2. Create and Activate a Virtual Environment (optional, but recommended)

-- On macOS and Linux:
```bash
python3 -m venv env
source env/bin/activate
```

-- On Windows:
```bash
py -m venv env
.\env\Scripts\activate
```
3. Install Required Python Packages
```bash
pip install -r requirements.txt
```
4. Start the Quart Backend

```bash
hypercorn app:app --reload
```
The backend server should now be running on http://127.0.0.1:8000.

#### Setting up the Frontend
1. Navigate to the Frontend Directory

Assuming you are in the root directory of the project:

```bash
cd frontend
```
2. Install Node Modules

```bash
npm install
```
3. Start the React Development Server

```bash
npm start
```
The frontend should now be accessible at http://localhost:5173.

#### Usage
After setting up both the backend and frontend servers, open your web browser and navigate to http://localhost:5173. You should see the RealSync Grid interface, where you can start managing and collaborating on data in real time.