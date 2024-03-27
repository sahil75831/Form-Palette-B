function supressKeys(obj, keys) {
  let filteredObj = {};
  for (let key in obj) {
    if (!keys.includes(key)) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}
const obj = {
  hello: "world",
  a: "apple",
  b: "ball",
  c: "cat",
  animal: "peackok",
  lkjh: "lkjh",
};
console.log(supressKeys(obj, ["a", "b"]));
