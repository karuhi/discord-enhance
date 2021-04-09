function generateRandomString_v1() {
  const rand = Math.floor(Math.random() * 10);
  let randStr = "";

  for (let i = 0; i < 20 + rand; i++) {
    randStr += String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }

  return randStr;
}
function generateRandomString_v2() {
  const rand = Math.floor(Math.random() * 10);
  let randStr = "";

  for (let i = 0; i < 20 + rand; i++) {
    randStr += String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }
  if (checkVaridation(randStr)) {
    generateRandomString_v2();
    console.log("regenerate from:" + randStr);
  } else {
    console.log("generated:" + randStr);
    return randStr;
  }
}

function checkVaridation(str) {
  let reg1 = new RegExp("&", "ig");
  let reg2 = new RegExp("\\?", "ig");
  let test1 = reg1.test(str);
  let test2 = reg2.test(str);
  return test1 || test2;
}

function generateRandomString_v3() {
  const length = 20;
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789---...___";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}
