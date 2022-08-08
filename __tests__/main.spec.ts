import {exec} from "../src/main";

describe('Example Test', function () {
  it('should GET / with 200 OK', function () {
    exec("test", "(1 + 1) * 2");
  })


})
