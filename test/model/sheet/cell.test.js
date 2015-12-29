"use strict";

var Cell = require("../../../dist/model/sheet/cell");
var assert = require("power-assert");

describe("Cell", function() {
  describe("toMinJS()", function() {
    it("null", function() {
      var cell = Cell.create();
      assert.equal(JSON.stringify(cell.toMinJS()), JSON.stringify({}));
      assert.equal(Object.keys(cell.toMinJS()).length, 0);
    });

    it("change text", function(){
      var cell = Cell.create().setText("1");
      assert.equal(JSON.stringify(cell.toMinJS()), JSON.stringify({"text": "1"}));
      assert.equal(Object.keys(cell.toMinJS()).length, 1);
    });
  });

  describe("fromJS()", function() {
    it("null", function() {
      var cell = Cell.fromJS(null);
      assert.equal(cell.text, "");
    });

    it("{}", function() {
      var cell = Cell.fromJS({});
      assert.equal(cell.text, "");
    });

    it("text", function() {
      var cell = Cell.fromJS({text: "4"});
      assert.equal(cell.text, "4");
    });

  });
});
