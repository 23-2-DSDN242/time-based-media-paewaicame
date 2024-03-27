[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/H1UMq2qW)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14047203&assignment_repo_type=AssignmentRepo)

# MDDN 242 Project 1: Time-based Media  
This project is a spin on classic segmented displays often found in digital LCD timepieces like digital watches and clocks. Time is displayed in typography that takes advantage of a matrix of segmented displays, converting a typically limiting form of text display into an interesting and modern take on the classic timepiece.

## Segmented Display
The segmented display is entirely parameterised, including variables for the width and height of each segment and the number of numerals per row and column.

The clock's graphics are drawn to an off-screen buffer, which is then sampled by each segment. This allows for full customisation of the clock's graphics for the segmented display to display automatically.

Each number is stored alongside its previous state, allowing smooth transitions between values as the clock ticks, making for an exciting and dynamic clock face.

## Palette
The clock includes a palette of 5 colors, based on classic segmented display colors. Confetti falls behind the numbers for a fun and pleasing backdrop.

Each time the minute changes, the clock cycles to the next palette in the list, and a burst of confetti fills the screen. Clicking anywhere on the canvas will also cycle through these colors manually.

## Alarm
When the alarm is set, a progress bar appears via a smooth transition, displaying the time remaining. When the alarm completes, the screen flashes bright colors for 10 seconds and the progress bar hides.

## ChatGPT usage
ChatGPT was used in the development of this project to debug issues and provide personalised insight on my project goals. For instance, ChatGPT suggested drawing graphics to an offscreen buffer, which greatly improve the appearance and performance of the final product. ChatGPT was not used to generate sizeable blocks of code to copy and paste, or to provide ideas that would create a major diversion from my initial concept.

The entire chat conversation for this project can be found [here](https://chat.openai.com/share/580b8a50-efde-41ae-94aa-3da89c38b1d2)