function setName(obj) {
  obj.name = 'hello world';
  obj = new Object();
  obj.name = 'nihao';
}

let language = new Object();
setName(language);
console.log(language.name); // 'hello world'