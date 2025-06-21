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

<p align="center">
  <img width="400" src="https://github.com/user-attachments/assets/7f0355d9-468a-4b94-a69d-84a360dd74a3">
  <img width="75" height="1" alt="" src="https://via.placeholder.com/40x1/FFFFFF/FFFFFF?text=+">
  <img width="400" src="https://github.com/user-attachments/assets/9ed0c8bc-5839-4b57-8bc2-7dee929129e7">
</p>

#### CAP points
CAP points with customizable racetracks dimensions, orientation, turn side and color.

<p align="center">
  <img width="400" src="https://github.com/user-attachments/assets/c40a96dc-b285-4d07-a74a-c1334a7f72e4">
</p>

#### Area points
Define an area or interest with area points.These points can constrain the bullseye "spider" and be re-ordered.

<p align="center">
  <img width="400" src="https://github.com/user-attachments/assets/3e176585-2a40-4653-8e0a-ce25c4436012">
</p>

#### Points
Points of interest not linked to a CAP, area or flight plan. Multiple types available.

<p align="center">
  <img width="400" src="https://github.com/user-attachments/assets/aa1e23d8-1203-4e9a-8e5a-0c20e7c3bb5a">
</p>

#### Flight plan
Points linked by a double line to indicate a flight plan. The nav points can be re-ordered.

<p align="center">
  <img width="400" src="https://github.com/user-attachments/assets/6c4fd19a-b321-4aee-8978-cee681a13eef">
</p>

#### Borders
Lines use to delimitate borders, FLOTs, FEBAs... Can be named and the line color customized.

<p align="center">
  <img width="400" src="https://github.com/user-attachments/assets/f13d4322-a392-4c14-b184-be52efae43e7">
</p>

#### Rings
Rings with name, customizable ring size and ring color. The ring can be constrained to the area of interest.

<p align="center">
  <img width="400" src="https://github.com/user-attachments/assets/66dc9bac-6344-45ee-96f2-08b6471522c7">
</p>

#### Gates
Bridge-shaped elements to represent gates, with name and customizable color. 

<p align="center">
  <img width="400" src="https://github.com/user-attachments/assets/b867dcee-7d53-40b4-9d59-dd835d2de00a">
</p>

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
  <img width="300" src="https://github.com/user-attachments/assets/7d3d37c6-5de4-4d04-84b6-6308da52e800">
  <img width="30" height="1" alt="" src="https://via.placeholder.com/40x1/FFFFFF/FFFFFF?text=+">
  <img width="300" src="https://github.com/user-attachments/assets/4ed0ecbd-b77c-42d0-8319-b904e0906ab1">
  <img width="30" height="1" alt="" src="https://via.placeholder.com/40x1/FFFFFF/FFFFFF?text=+">
  <img width="300" src="https://github.com/user-attachments/assets/8414adb7-f5b0-4134-908a-ae532ae24755">

</p>



#### Feel free to fork, use, and share.
