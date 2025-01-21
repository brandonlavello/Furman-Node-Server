# Furman Node Server

This project establishes a Node.js web server hosted on a Linux machine to control A/V equipment within a building. It complements the [Furman Flask Serial Server](https://github.com/brandonlavello/Furman-Flask-Serial-Server) project, enabling comprehensive management of A/V devices throughout the facility.

## Features

- **Web-Based Interface**: Provides a user-friendly web interface accessible at `http://[ip_address]:8000/` for controlling A/V equipment.
- **WebSocket Communication**: Utilizes WebSockets to interact with multiple Raspberry Pi devices on the same network, facilitating real-time control and status updates.
- **Serial Interface Control**: Each Raspberry Pi connects to non-networked A/V equipment via a serial interface, allowing the server to toggle devices on or off through relay-controlled power conditioners.
- **Real-Time Synchronization**: Employs Socket.io to manage user sessions, update the web page based on device status (on/off), and broadcast status changes to all connected users.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/brandonlavello/Furman-Node-Server.git
   ```

2. **Navigate to the Project Directory:**
  ```bash
  cd Furman-Node-Server
  ```

3. **Install Dependencies:**
Ensure that Node.js and npm are installed on your system, then run:
  ```bash
    npm install
  ```

## Usage

### Start the Server:
  ```bash
    node combo.js
  ```

### Access the Web Interface:
Open a web browser and navigate to http://[ip_address]:8000/ to control the A/V equipment.

## License

This project is licensed under the MIT License.

## Acknowledgments

Developed by Brandon Lavello.
