

export function decode({
  input,
}:{
  input: string;
}){

  // decode
  let decodedBytes: number[] = [];

  for (const char of input) {
    const code = char.codePointAt(0)!;

    if (code >= 0xFE00 && code <= 0xFE0F) {
      decodedBytes.push(code - 0xFE00);
    } else if (code >= 0xE0100 && code <= 0xE01EF) {
      decodedBytes.push(code - 0xE0100 + 16);
    }
  }

  const decoded = new TextDecoder().decode(new Uint8Array(decodedBytes));
  return decoded;

}