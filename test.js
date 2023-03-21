const ArrayA  = ['A','B','C']
const ObjectA = {
  'A' : 'A',
  'B' : 'B',
  'C' : 'C',
}

const mapz = ArrayA.map(element=>{
  return `\'${element}\'`
})
// console.log(ArrayA.join());
// console.log(Object.values(ObjectA).toString());
console.log(mapz.join());