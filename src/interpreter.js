module.exports = function(language){

  var module = {};

  var GobstonesInterpreterApi = require("gobstones-interpreter").GobstonesInterpreterAPI;
  var interpreter = new GobstonesInterpreterApi();
  if (language !== undefined){
    interpreter.config.setLanguage(language)
  }

  module.parse = function(code, operation) {
    var result = interpreter[operation || "parse"](code);

    if (result.reason)
      throw {
        status: "compilation_error",
        result: result
      };

    return result;
  };

  module.interpret = function(program, board) {
    var result = program.interpret(board);

    if (result.reason)
      throw {
        status: "runtime_error",
        result: result
      };

    return result;
  }

  module.getAst = function(code) {
    return parse(code, "getAst");
  }

  module.parseProgram = function(code) {
    return parse(code).program;
  }

   module.readGbb = function(gbb) {
    return interpreter.gbb.read(gbb);
  }

  module.buildGbb = function(board) {
    return interpreter.gbb.write(board);
  }

  return module;

}
