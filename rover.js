class Rover {
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
      };

      for(let i = 0; i < message.commands.length; i++) {
         let command = message.commands[i];
         console.log(`Processing command: ${command.commandType} with mode: ${this.mode}`);

         if (command.commandType === "STATUS_CHECK") {
            response.results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            });
         } else if (command.commandType === "MODE_CHANGE") {
            this.mode = command.newMode;
            response.results.push({completed: true});
         } else if (command.commandType === "MOVE") {
            if (this.mode === "LOW_POWER") {
               response.results.push({completed: false});
            } else {
               this.position = command.newPosition;
               response.results.push({completed: true});
            }
         } else {
         response.results.push({completed: false});
         }
      }

      return {
         message: message.name,
         response
      };
   }
}
module.exports = Rover;