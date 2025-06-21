# bullseye-map-generator

A bullseye map generator primarily designed for the DCS Mirage 2000C, based on a French Air Force kneeboard example.

## Disclaimer

This tool will produce a readable map when setup properly, but it is not foolproof. It is easy to break intentionally.

The app is **not responsive** and **doesn't work on smartphone display**.

## Features

### Map generation

All elements are placed based on their azimuth and distance relative to the bullseye. The map is automatically scaled and the bullseye repositioned to ensure all the elements fit within the canvas.

#### Bullseye
The bullseye "spider" options like rings range and line angles can be customized. It can also be constrained to an area to improve readability.

#### CAP points
CAP points with customizable racetracks dimensions, orientation, turn side and color.

#### Area points
Define an area or interest with area points.These points can constrain the bullseye "spider" and be re-ordered.

#### Points
Points of interest not linked to a CAP, area or flight plan. Multiple types available.

#### Flight plan
Points linked by a double line to indicate a flight plan. The nav points can be re-ordered.

#### Borders
Lines use to delimitate borders, FLOTs, FEBAs... Can be named and the line color customized.

#### Rings
Rings with name, customizable ring size and ring color. The ring can be constrained to the area of interest.

#### Gates
Bridge-shaped elements to represent gates, with name and customizable color. 

### Session saving

The app automatically saves the map current layout to your browser’s local storage.

### Import/Export

Export or import map layouts via JSON files to save or share your work.

### Portable

The app is self-contained and portable - It can be downloaded and run offline.

### Download

Easily export the map as a PNG file.

## Examples
<p align="center">
  <img width="600" src="https://github.com/user-attachments/assets/7d3d37c6-5de4-4d04-84b6-6308da52e800">
</p>



#### Feel free to fork, use, and share.