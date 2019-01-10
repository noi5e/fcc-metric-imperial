/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      assert.equal(convertHandler.getNum('3.2'), 3.2)
      done()
    });
    
    test('Fractional Input', function(done) {
      assert.equal(convertHandler.getNum('3/2'), 1.5)
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      assert.equal(convertHandler.getNum('1.5/3'), .5)
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      assert.isUndefined(convertHandler.getNum('5/4/3'))
      done();
    });
    
    test('No Numerical Input', function(done) {
      assert.equal(convertHandler.getNum('lb'), 1)
      done();
    });
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele)
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.isUndefined(convertHandler.getUnit('1xb'))
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        // console.log('output: ' + convertHandler.getReturnUnit(ele) + ', expected: ' + expect[i])
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
      var expect = ['gallon(s)', 'liter(s)', 'mile(s)', 'kilometer(s)', 'pound(s)', 'kilogram(s)']
      input.forEach(function(ele, i) {
        // console.log('output: ' + convertHandler.spellOutUnit(ele) + ', expected: ' + expect[i])
        
        assert.equal(convertHandler.spellOutUnit(ele), expect[i])
      })
      done()
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      // var expected = 1
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'L']
      var expected = 1.32
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi']
      var expected = 8.05
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'km']
      var expected = 3.107
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [5, 'lb']
      var expected = 2.27
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'kg']
      var expected = 11.02
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
  });

});