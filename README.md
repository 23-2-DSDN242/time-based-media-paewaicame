[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/H1UMq2qW)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14047203&assignment_repo_type=AssignmentRepo)

# MDDN 242 Project 1: Time-based Media  

This project is a spin on classic segmented displays often found in digital LCD timepieces like digital watches and clocks. Time is displayed in sophisticated typography that takes advantage of a matrix of segmented displays converting a typically limiting form of text display into an interesting and modern take on a segmented display.

The clock's graphics are drawn onto an off-screen buffer, which is then sampled by an array of segments. This allows for full customisation of the clock's graphics for the segmented display to pull from.

Each number transitions as it changes its value, making for an exciting and dynamic clock face. Each time the minute ticks over, a burst of confetti fills the background and the clock changes color.

## Segmented Display
The segmented display is entirely parameterised, including variables for the width and height of each segment and the density of the display grid. Colors are stored in a palette that can be dynamically cycled through, like.

Each number is stored alongside its previous state and a transition factor, allowing smooth transitions between numbers as the clock ticks.