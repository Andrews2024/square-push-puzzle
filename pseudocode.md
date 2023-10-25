# Square Push App
* Configuration buttons
    * 4x4
    * 5x5
    * 6x6
* Game window
    * Configuration
* Movement buttons
    * Left
    * Right
    * Up
    * Down
* Remove group button
* Score
* Move counter
* Reset game button
* Complete game button
# Model
```
loadConfiguration(configuration) {
    # Fill in game board based on given configuration
    # Save board to array
}

check2x2() {
    # Check if there is a 2x2 group of a color

    # If there is a 2x2 group
        # Enable "Remove Group" button
        # Set property of color that can be removed
}

checkComplete() {
    # If all sqaures are blank
        # Enable "Complete Game" button
}

removeGroup() {
    # For each block of the removable color
        # Set the location of that block to blank
}

checkValidMoves() {
    # For each direction (up, down, left, right)
        # If Ninja can move that direction, enable that button
}

moveNinja(direction) {
    # Get affected blocks and move them with moveBlock
    # Move Ninja in direction
    # Increase the move counter by 1
    # Increase score by the number of affected blocks
}

moveBlock(direction, affectedBlocks) {
    # For each block in affectedBlocks
        # Move block in direction
            # If there is a block in the new spot, add that block to affectedBlocks and call moveBlock
}
```
# Configurations
```
export const config_5x5 = {
    "name": "Configuration #1",
    "numRows" : "5",
    "numColumns" : "5",
    "ninjaRow" : "4",
    "ninjaColumn": "D",
    "initial" : [
        { "color" : "red", "row": "1", "column" : "D" },
        { "color" : "red", "row": "1", "column" : "E" },
        { "color" : "red", "row": "3", "column" : "D" },
        { "color" : "red", "row": "3", "column" : "E" },
      
        { "color" : "orange", "row": "2", "column" : "A" },
        { "color" : "orange", "row": "2", "column" : "C" },
        { "color" : "orange", "row": "3", "column" : "A" },
        { "color" : "orange", "row": "3", "column" : "C" },

        { "color" : "blue", "row": "4", "column" : "A" },
        { "color" : "blue", "row": "4", "column" : "C" },
        { "color" : "blue", "row": "5", "column" : "A" },
        { "color" : "blue", "row": "5", "column" : "C" }
    ]
}

export const config_4x4 = {
    "name": "Configuration #2",
    "numRows" : "4",
    "numColumns" : "4",
    "ninjaRow" : "2",
    "ninjaColumn": "B",
    "initial" : [
        { "color" : "red", "row": "1", "column" : "C" },
        { "color" : "red", "row": "2", "column" : "D" },
        { "color" : "red", "row": "3", "column" : "A" },
        { "color" : "red", "row": "4", "column" : "C" } 
    ]
}

export const config_6x6 = {
    "name": "Configuration #3",
    "numRows" : "6",
    "numColumns" : "6",
    "ninjaRow" : "1",
    "ninjaColumn": "C",
    "initial" : [
        { "color" : "red", "row": "1", "column" : "E" },
        { "color" : "red", "row": "4", "column" : "A" },
        { "color" : "red", "row": "5", "column" : "A" },
        { "color" : "red", "row": "5", "column" : "D" },

        { "color" : "orange", "row": "1", "column" : "B" },
        { "color" : "orange", "row": "2", "column" : "B" },
        { "color" : "orange", "row": "5", "column" : "E" },
        { "color" : "orange", "row": "6", "column" : "E" },

        { "color" : "yellow", "row": "1", "column" : "F" },
        { "color" : "yellow", "row": "2", "column" : "E" },
        { "color" : "yellow", "row": "3", "column" : "D" },
        { "color" : "yellow", "row": "4", "column" : "C" },
     
        { "color" : "brown", "row": "2", "column" : "A" },
        { "color" : "brown", "row": "3", "column" : "A" },
        { "color" : "brown", "row": "3", "column" : "B" },
        { "color" : "brown", "row": "4", "column" : "B" },

        { "color" : "gray", "row": "2", "column" : "F" },
        { "color" : "gray", "row": "3", "column" : "C" },
        { "color" : "gray", "row": "3", "column" : "E" },
        { "color" : "gray", "row": "4", "column" : "E" },

        { "color" : "green", "row": "3", "column" : "F" },
        { "color" : "green", "row": "4", "column" : "F" },
        { "color" : "green", "row": "5", "column" : "F" },
        { "color" : "green", "row": "6", "column" : "F" },

        { "color" : "purple", "row": "6", "column" : "A" },
        { "color" : "purple", "row": "6", "column" : "B" },
        { "color" : "purple", "row": "6", "column" : "C" },
        { "color" : "purple", "row": "6", "column" : "D" },

        { "color" : "blue", "row": "1", "column" : "A" },
        { "color" : "blue", "row": "4", "column" : "D" },
        { "color" : "blue", "row": "5", "column" : "B" },
        { "color" : "blue", "row": "5", "column" : "C" }
    ]
}
```