
export function getPuzzleJSON(puzzle) {
  let result =  '';
  result = reverseString(puzzle);

  return result;  
}

function reverseString(str) {
  if (str === "")
    return "";
  else
    return reverseString(str.substr(1)) + str.charAt(0);
}
