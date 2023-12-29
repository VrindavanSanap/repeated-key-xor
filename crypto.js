const chars = "abcdefghijklmnopqrstuvwxyz";
import { chisquare } from "jstat"
import {add, dotDivide, inv, pow, map, sum, multiply, square, subtract, divide} from "mathjs"
let expected_prob = [0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015,
  0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406, 0.06749, 0.07507,
  0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978, 0.02360,
  0.00150, 0.01974, 0.00074]

export const stoi = {};
export const itos = {};
for (let i = 0; i < chars.length; i++) {
  const ch = chars[i];
  stoi[ch] = i;
  itos[i] = ch;
}
export function is_valid_hex(string){
  const hex_regex= /^[0-9A-F]+$/i;
  return hex_regex.test(string);
}



export function repeat_key_xor(string1, key){
  let string2 = "";
  while (string1.length > string2.length) {
    string2 += key; 
  }
  string2 = string2.slice(0, string1.length);
  console.log(string1)
  if(!(string1.length == string2.length)){
        return "Non vaild strings"
  }
  let result = "";
  for(let i = 0; i < string1.length; i++){
    let hex1 = string1.charCodeAt(i);
    let hex2 = string2.charCodeAt(i);
    let hex3 = hex1 ^ hex2;
    result += (hex3.toString(16));
  }
  return result; 


}
export function repeat_key_xor_dec(hex_string, key){
  /*

  */
  let result = "";
  for(let i = 0; i < hex_string.length; i+=2){
    let n1 = key.charCodeAt((i/2)%key.length);
    let n2 = parseInt(hex_string.slice(i,i +2), 16);
    let n_res = n1 ^ n2;
    console.log(n1, n2, n_res, hex_string.slice(i,i +2))
    result += (String.fromCharCode(n_res));
  }
  return result; 
}



export function ceaser_cipher(string, n = 0){
  string = string.replace(/[^a-zA-Z]/g, '').toLowerCase();
  let result = "";
  for (let i = 0; i < string.length; i++) {
    let c = string[i];
    result +=  itos[(stoi[c] + n) % 26]
  }
  return result;
}
export function word_freq(string) {
  /*
    Given a string, return frequencies as a list 
  */
  let frequencies = new Array(26).fill(0);

  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (/[a-zA-Z]/.test(char)) {
      char = char.toLowerCase();
      let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      frequencies[index]++;
    }
  }
  return frequencies;
}

export function chi_squared(expected, observed){
 let epsilon = 0.001
 return sum(dotDivide(map(subtract(expected, observed), square) , 
                      add(expected,epsilon)))
}

export function sentence_score(string){
  /*
    Given string return score of its likliness to be a english sentence
  */
  let len = string.length 

  let freq = word_freq(string)
  let exp_freq = multiply(expected_prob , len)
  let chi_squared_value= chi_squared(exp_freq, freq)

  return parseInt(chi_squared_value )
}



