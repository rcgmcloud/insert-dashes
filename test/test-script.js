var window = window || undefined;

if (window) {
  GLOBAL = window;
} else {
  var fs = require('fs');
  var vm = require('vm');
  var sinon = require('sinon');
  var chai = require('chai');
  var functionsFile = fs.readFileSync(process.cwd() + '/insert-dashes.js');
  vm.runInThisContext(functionsFile); // file runs and it's contents has access to GLOBAL
}


var expect = chai.expect;
var should = chai.should();

describe("Main", function() {
  var sandbox;

  beforeEach(function() {
    // create a sandbox
    sandbox = sinon.sandbox.create();

    // stub some console methods
    sandbox.stub(console, "log");
    sandbox.stub(console, "error");
  });

  afterEach(function() {
    // restore the environment as it was before
    sandbox.restore();
  });

  describe("#insertDashes", function() {
    it("should be a function", function() {
      (typeof GLOBAL.insertDashes).should.equal("function");
    });
    it("return an empty string if nothing is given", function() {
      (GLOBAL.insertDashes()).should.equal("");
    });
    it("return an empty string if anything but a string is given", function() {
      (GLOBAL.insertDashes(4)).should.equal("");
      (GLOBAL.insertDashes(-4)).should.equal("");
      (GLOBAL.insertDashes(undefined)).should.equal("");
      (GLOBAL.insertDashes(null)).should.equal("");
    });
    it("return the same string if a string contains no numbers", function() {
      (GLOBAL.insertDashes("ball")).should.equal("ball");
      (GLOBAL.insertDashes("cat")).should.equal("cat");
    });
    it("return a string with dashes only between consecutive odd integers", function() {
      (GLOBAL.insertDashes("45293")).should.equal("4529-3");
      (GLOBAL.insertDashes("5827532")).should.equal("5827-5-32");
      (GLOBAL.insertDashes("Planet 77")).should.equal("Planet 7-7");
    });
    it("should return a integer", function() {
      (GLOBAL.insertDashes("1")).should.equal("1");
      (GLOBAL.insertDashes("2")).should.equal("2");
    });
    it("should return a negative integer", function() {
      (GLOBAL.insertDashes("-1")).should.equal("-1");
      (GLOBAL.insertDashes("-2")).should.equal("-2");
    });
  });
  describe("#checkOdd", function() {
    it("should be a function", function() {
      (typeof GLOBAL.checkOdd).should.equal("function");
    });
    it("return true if the character is an odd number", function() {
      (GLOBAL.checkOdd("3")).should.equal(true);
      (GLOBAL.checkOdd("27")).should.equal(true);
    });
    it("return false if the character is anything but an odd number", function() {
      (GLOBAL.checkOdd("4")).should.equal(false);
      (GLOBAL.checkOdd("k")).should.equal(false);
      (GLOBAL.checkOdd("")).should.equal(false);
      (GLOBAL.checkOdd(" ")).should.equal(false);
    });

  });
});
