const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function() {
    const position = "position";
    const mode = "NORMAL";
    const generatorWatts = 110;
    const rover = new Rover (position, mode, generatorWatts);
    expect(rover.position).toEqual("position")
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });

  // TEST 8
  test("response returned by receiveMessage contains the name of the message", function() {
    const rover = new Rover(9832, "NORMAL");
    const message = new Message("Test", []);
    const response = rover.receiveMessage(message);
    expect(response.messageName).toEqual("Test");
  });

  // TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect()
  });

  // TEST 10


  // TEST 11


  // TEST 12


  // TEST 13


});
