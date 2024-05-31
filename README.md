# The Nest

<details>
<summary>Table of Contents</summary>

1. [About The Project](#about-the-project)
    * [Built With](#built-with)
2. [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
3. [Usage](#usage)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)
6. [License](#license)
7. [Contact](#contact)
8. [Credits](#credits)


</details>


## About the Project

The Nest is designed to make it easier to choose guests who will attend your wedding by ranking and categorizing them. Down the road, the same information will be used to return a mock seating chart.

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

## Installation  

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

### Installing TypeScript and Sass

The project uses TypeScript and Sass. Follow these steps to install them globally:

1. **Install TypeScript**:
   - Run the following command to install TypeScript globally:
     ```sh
     npm install -g typescript
     ```

2. **Install Sass**:
   - Run the following command to install Sass globally:
     ```sh
     npm install -g sass
     ```

### Running the Project

After installing the dependencies, you can run the project.

1. **Compile TypeScript files**:
   - Run the following command to compile TypeScript files:
     ```sh
     tsc
     ```

2. **Compile Sass files**:
   - Run the following command to compile Sass files:
     ```sh
     sass src/scss:dist/css
     ```

3. **Start the development server**:
   - Depending on your setup, you may have different scripts to start your project. Here is a common example:
     ```sh
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

