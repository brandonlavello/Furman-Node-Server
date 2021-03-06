# Furman Node Server 

This project creates a Node.js webserver hosted on a Linux Machine.

The server accesses devices on the same Local Area Network to toggle on/off A/V equipment that is around the building.

This project complements the [Furman-Flask-Serial-Server](https://github.com/brandonlavello/Furman-Flask-Serial-Server) project to control AV equiptment throughout the building.

This webpage can be accessed at: ```http://[ip_address]:8000/```

## Description

This Node.js server interacts with multiple Raspberry Pi's on the same network using Websockets on each individual Pi.  The Pi's are connected to non-networked A/V equipment using a Serial interface from the Pi to a relay controlled power conditioner to switch equipment on/off.

Socket.io handles the user session, updates the webpage based on the device status (on/off), and emits the updated status to all other users.
