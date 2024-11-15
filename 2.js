/*
Diketahui sebuah data array sebagai berikut:
[“u”, “D”, “m”, “w”, “b”, “a”, “y”, “s”, “i”, “s”, “w”, “a”, “e”, “s”, “e”, “o”, “m”,” “ ,” “]
Buatlah sebuah function yang bertugas untuk menyusun array berikut menjadi “Dumbways is awesome”
menggunakan selection sort.
*/

const array = ["u", "D", "m", "w", "b", "a", "y", "s", "i", "s", "w", "a", "e", "s", "e", "o", "m", " ", " "];
const target = "Dumbways is awesome";

function sortArray(array, target) {
  let sortedArray = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] == target[i]) {
        sortedArray.push(array[j]);
        break;
      }
    }
  }
  return sortedArray.join("");
}

console.log(sortArray(array, target));