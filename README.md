# The Nest

<details>
<summary>Table of Contents</summary>

1. [About The Project](#about-the-project)
    * [Built With](#built-with)
2. [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation Instructions](#installation-instructions)
3. [Usage](#usage)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)
6. [License](#license)
7. [Contact](#contact)
8. [Credits](#credits)


</details>


## About the Project

The Nest is designed to make it easier to choose guests who will attend your wedding by ranking and categorizing them. Down the road, the same information will be used to return a mock seating chart.

Deployed Site: [https://welcome-to-the-nest-irdb.onrender.com/](https://welcome-to-the-nest-irdb.onrender.com/)

### Built With
The Nest requires the following to run:
* Node.JS 
* Express.JS
* React.JS
* PostgreSQL
* React Bootstrap

## Getting Started

### Prerequisites

To start, run:   
   ```sh
    npm install npm@latest -g    
   ```

## Installation Instructions

### Forking and Cloning the Repository

1. **Fork the repository**:
   - Navigate to the repository on GitHub.
   - Click the "Fork" button in the top-right corner of the page.

2. **Clone the forked repository**:
   - Open your terminal or command prompt.
   - Run the following command, replacing `<your-username>` with your GitHub username:
     ```sh
     git clone https://github.com/<your-username>/wedding-app.git
     ```
   - Navigate to the project directory:
     ```sh
     cd wedding-app
     ```

### Installing Dependencies

Before running the project, you need to install the required dependencies.

1. **Install Node.js**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/).

2. **Install npm (Node Package Manager)**:
   - npm is installed automatically with Node.js.

3. **Install project dependencies**:
   - Run the following command to install the dependencies listed in `package.json`:
     ```sh
     npm install
     ```

### Setting Up PostgreSQL

The project uses PostgreSQL as the database. Follow these steps to set it up:

1. **Install PostgreSQL**:
   - Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/).

2. **Create a new database**:
   - Open your PostgreSQL command line interface (psql) or use a GUI tool like pgAdmin.
   - Run the following SQL command to create a new database:
     ```sql
     CREATE DATABASE wedding_app;
     ```

3. **Configure the database connection**:
   - Update the database configuration in your backend code with your PostgreSQL credentials.

### Running the Project

After installing the dependencies and setting up PostgreSQL, you can run the project.

1. **Start the backend server**:
   - Navigate to the backend directory and start the server:
     ```sh
     cd backend
     npm install
     node index.js
     ```

2. **Start the frontend development server**:
   - Navigate to the frontend directory and start the React development server:
     ```sh
     cd ../frontend
     npm install
     npm start
     ```

### Common Commands

Here are some common npm scripts you might use during development:

- **Build the project**:
  ```sh
  npm run build

   

## Usage
Users will sign up, log in, or choose the demo version to get started. Users will create categories and then fill out wedding party and other guests. After this section users will be directed to a guestlist, where they can further make edits to their guest list, then fill out info about their wedding venue, how many people they want to have come, and the cost per person. Based on guest values assigned, this will return a list with guests that should and shouldn't attend the wedding. Down the road, this info will be able to return a seating chart.

## Roadmap
* Seating Chart functionality   
* Enhanced User Profile Settings    
* Attach Contact Info to Guests         


## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.     

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!     

Fork the Project  
* Create your Feature Branch (git checkout -b feature/AmazingFeature)  
* Commit your Changes (git commit -m 'Add some AmazingFeature')  
* Push to the Branch (git push origin feature/AmazingFeature)  
* Open a Pull Request   


## License
This project is licensed under the MIT License

## Contact
Kolby Kiernan - kolbykiernan@gmail.com    
Project Link:[https://github.com/kolbykiernan/wedding-app.git](https://github.com/kolbykiernan/wedding-app.git)     

## Credits
* The Nest Logo - created by [Adobe Firefly](https://firefly.adobe.com/)
* [Google Fonts](https://fonts.google.com/)

