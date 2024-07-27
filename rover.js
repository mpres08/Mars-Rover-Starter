class Rover {
   constructor(position, mode, generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }

   receiveMessage(message) {
      let results = [];

      for(let i = 0; i < message.commands.length; i++) {
         let command = message.commands[i];

         if (command === "STATUS_CHECK") {
            results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            });
         } else if (command.commandType === "MODE_CHANGE") {
            this.mode = command.newMode;
            results.push({completed: true});
         } else if (command.commandType === "MOVE") {
            if (this.mode === "LOW_POWER") {
               results.push({completed: false});
            } else {
               this.position = command.newPosition;
               results.push({completed: true});
            }
         } else {
         results.push({completed: true});
         }
      }

      return {
         messageName: message.name,
         results: results
      };
   }
}
module.exports = Rover;