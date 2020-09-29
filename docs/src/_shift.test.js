import {_shift} from "./_shift";

test('tabs through a square horizontally', ()=> {
  expect(_shift(
    0,// x
    0,// y
    1,// deltaX
    0,// xMin
    0,// xMax
    10,// yMin
    10// yMax
  )).toEqual({x:1,y:0})

})