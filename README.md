# Pinger

Pinger is a script that pings a list of hosts and writes the results to a CSV file. The script can be run continuously in the background to monitor the availability of the hosts.

## Requirements

-   Node.js
-   `ping` module

## Installation

1. Install Node.js on your system if it is not already installed
2. Clone the repository or download the script
3. Run `npm install ping` to install the `ping` module
4. Create a file named `config.json` in the same directory as the script and add the interval and list of hosts you want to ping in the following format:

```json
{
    "interval": 10000, // Minimum interval is 2000ms
    "hosts": ["host1", "host2", "host3"]
}
```

5. Run the script by running the command `node pinger.js` in the command prompt or terminal

## Usage

The script creates a file named `ping.csv` in the same directory as the script, which contains the results of the ping in the following format:

```csv
Uhrzeit,Datum,Host,Time (ms),Status
```

-   Uhrzeit: the current time
-   Datum: the current date
-   Host: the host being pinged
-   Time (ms): the time taken to complete the ping
-   Status: whether the host is alive or dead

The script also logs the status of the scan in the console. It starts by logging "Starte Scan..." and then logs "Scan läuft... (x Geräte)" with x being the number of hosts in the list.

The script runs continuously and pings the hosts every 10 seconds by default. You can change the interval by modifying the value passed to the `setInterval` function.

## Note

If you want to stop the script, you can press `Ctrl + C` on your keyboard.

## Conclusion

This script is a simple way to monitor the availability of a list of hosts. It allows you to easily check if a host is alive or dead and logs the results in a CSV file for further analysis.
