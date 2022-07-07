let a = [1, 2, 3];
let b = {a:4, b:5, c:6}
let c = a.map((item, index) => ({item:index}))
console.log(c)