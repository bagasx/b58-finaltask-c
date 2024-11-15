/*
Buatlah sebuah function yang akan mencetak pola segitiga terbalik
yang terdiri atas karakter # dan + seperti berikut:
# + # + #
 + + + +
  + # +
   + +
    #
*/

function cetakPola(n) {
  let segitiga = "";

  for (let i = 0; i < n; i++) {
    let baris = "";

    for (let j = 0; j < n - i; j++) {
      if (i % 2 === 0 && j % 2 === 0) {
        baris += "# ";
      } else {
        baris += "+ ";
      }
    }
    segitiga += baris.trim() + "\n" + " ".repeat(i + 1);
  }
  return segitiga;
}

console.log(cetakPola(5));