/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {    
    // const numberRegex = /([0-9\/\.]*)(lbs?|kgs?|gals?|Ls?|mis?|kms?)*$/
    // const numberRegex = /([0-9\/\.]*)(.*)$/
    // const numberRegex = /([0-9\/\.]*)([A-Za-z]*)$/
    const numberRegex = /^([0-9\.]+\/?[0-9\.]+|[0-9\.]*)([A-Za-z]*)$/

    const numberMatch = input.match(numberRegex)
    
    // console.log('this is numberMatch: ', numberMatch)
 
    if (input.match(/^(lbs?|kgs?|gals?|Ls?|mis?|kms?)*$/)) {
      return 1
    }
    
    if (!numberMatch) {
      return undefined
    }
    
    return eval(numberMatch[1]);
  };
  
  this.getUnit = function(input) {
    const unitRegex = /(lbs?|kgs?|gals?|Ls?|mis?|kms?)*$/i
    const unitMatch = input.match(unitRegex)
    
    // console.log('this is unitMatch: ', unitMatch)

    if (!unitMatch || !unitMatch[0]) {
      return undefined
    }
    
    return unitMatch[0];
  };
  
  this.stripPlural = function(initUnit) {
    if (initUnit.substr(initUnit.length - 1, 1) === 's') {
      return initUnit.substring(0, initUnit.length - 1)
    }
    
    return initUnit
  }
  
  this.getReturnUnit = function(initUnit) {
    initUnit = this.stripPlural(initUnit).toLowerCase()
    
    switch(initUnit) {
      case "lb":
        return "kg";
        break;
        
      case "kg":
        return "lbs";
        break;
        
      case "gal":
        return "l";
        break;
        
      case "l":
        return "gal";
        break;
        
      case "mi":
        return "km";
        break;
        
      case "km":
        return "mi";
        break;
        
      default:
        return undefined
    }
  };

  this.spellOutUnit = function(unit) {
    unit = this.stripPlural(unit).toLowerCase()
    
    switch(unit) {
      case "lb":
        return "pound(s)";
        break;
        
      case "kg":
        return "kilogram(s)";
        break;
        
      case "gal":
        return "gallon(s)";
        break;
        
      case "l":
        return "liter(s)";
        break;
        
      case "mi":
        return "mile(s)";
        break;
        
      case "km":
        return "kilometer(s)";
        break;
        
      default:
        return undefined
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541; // 1 gal is 3.78 L
    const lbsToKg = 0.453592; // 1 lb is .45 kilos
    const miToKm = 1.60934; // 1 mi is 1.6 km

    initUnit = this.stripPlural(initUnit)
    
    switch (initUnit) {
      case "lb":
        return parseFloat((initNum * lbsToKg).toFixed(5));
        break;
        
      case "kg":
        return parseFloat((initNum / lbsToKg).toFixed(5));
        break;
        
      case "gal":
        return parseFloat((initNum * galToL).toFixed(5));
        break;
        
      case "L":
        return parseFloat((initNum / galToL).toFixed(5));
        break;
        
      case "mi":
        return parseFloat((initNum * miToKm).toFixed(5));
        break;
        
      case "km":
        return parseFloat((initNum / miToKm).toFixed(5));
        break;
        
      default:
        return undefined
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit) 
  };
  
}

module.exports = ConvertHandler;
