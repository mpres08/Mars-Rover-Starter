const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function() {
    const rover = new Rover(2000);

    expect(rover.position).toEqual(2000)
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  // TEST 8
  test("response returned by receiveMessage contains the name of the message", function() {
    const rover = new Rover(9832);
    const commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
    const message = new Message("Test", commands);
    const response = rover.receiveMessage(message).message;

    expect(response).toEqual(message.name);
  });

  // TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    const rover = new Rover(9832);
    const commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
    const message = new Message("Test", commands);
    const response = rover.receiveMessage(message).results.length;

    expect(response).toEqual(2);
  });

  // TEST 10
  test("responds correctly to the status check command", function() {
    const rover = new Rover(9832);
    const commands = [new Command('STATUS_CHECK')];
    const message = new Message("Test", commands);
    const response = rover.receiveMessage(message).results;

    expect(response.length).toEqual(1);
    expect(response[0].completed).toEqual(true);
    expect(response[0].roverStatus).toEqual({
      mode: "NORMAL",
      generatorWatts: 110,
      position: 9832
    });
  });

  // TEST 11
  test("responds correctly to the mode change command", function() {
    const rover = new Rover(9832);
    const commands = [{commandType: "MODE_CHANGE", newMode: "LOW_POWER"}];
    const message = new Message("Test", commands);
    const response = rover.receiveMessage(message).results;

    expect(response.length).toEqual(1);
    expect(response[0].completed).toEqual(true);
    expect(rover.mode).toEqual("LOW_POWER");
  });

  // TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    const rover = new Rover(9832);
    const commands = [new Command("MOVE", 9833)];
    const message = new Message("Test", commands);
    const response = rover.receiveMessage(message).results;

    expect(response.length).toEqual(1);
    expect(response.results[0].completed).toEqual(false);
    expect(rover.position).toEqual(9832);
  });

  // TEST 13
  test("responds with the position for the move command", function() {
    const rover = new Rover(9832);
    const commands = [new Command("MOVE", 9833)];
    const message = new Message("Test", commands);
    const response = rover.receiveMessage(message).results;

    expect(response.length).toEqual(1);
    expect(response.results[0].completed).toEqual(true);
    expect(rover.position).toEqual(9833);
  });

});
