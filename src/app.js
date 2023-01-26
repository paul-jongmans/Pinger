const ping = require('ping'); // importing the ping module
const fs = require('fs'); // importing the fs module to interact with the file system

var config = {
    interval: 10000, // interval in milliseconds to scan the devices
    hosts: [], // array to store the list of hosts to be pinged
}; // config to store the list of hosts to be pinged

if (!fs.existsSync('ping.csv')) {
    fs.writeFileSync('ping.csv', 'Uhrzeit,Datum,Host,Time (ms),Status\n'); // create the ping.csv file with headers if it does not exist
}

if (!fs.existsSync('config.json')) {
    fs.writeFileSync('config.json', JSON.stringify(config)); // create an empty json file if it does not exist
} else config = JSON.parse(fs.readFileSync('config.json')); // parse the json file and assign the host array

if (config.interval < 2000) {
    config.interval = 2000; // set the interval to 2000ms if it is less than 2000ms
    console.log('Der Intervallwert wurde auf 2000ms gesetzt, da er kleiner als 2000ms ist.'); // log that the interval value was set to 2000ms because it was less than 2000ms
}

const scanDevices = (devices) => {
    devices.forEach((device) => {
        ping.promise.probe(device).then(
            //ping the device
            (response) => {
                fs.appendFileSync('ping.csv', new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ',' + new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear() + ',' + response.host + ',' + response.time + ',' + (response.alive ? 'online' : 'offline') + '\n'); // write the current time, date, the host, the time taken to complete the ping, and the status (alive or dead) of the host to the "ping.csv" file
            },
            {
                timeout: 10, //set the timeout to 10 seconds
            }
        );
    });

    console.log('Scan läuft... (' + devices.length + ' Geräte)'); //log that the scan is running and the number of devices being scanned
};

console.log('Starte Scan...'); //log that the script is starting the scan

scanDevices(config.hosts); //call the scanDevices function with the hosts array
setInterval(() => scanDevices(config.hosts), config.interval); //call the scanDevices function every 10 seconds to continuously scan the devices
