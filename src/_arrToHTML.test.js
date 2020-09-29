import {_arrToHTML} from "./_arrToHTML";

test('_arrToHTML',()=>{
  expect(_arrToHTML([['A1']])).toContain('A1')
})