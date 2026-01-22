// encode

export function encode({
  emoji,
  secret,
}:{
  emoji: string;
  secret: string;
}){
  
  // Convert text to bytes and map to invisible variation selectors
  const bytes = new TextEncoder().encode(secret);
  let encoded = emoji;
  
  for (const byte of bytes) {
    if (byte < 16) {
      encoded += String.fromCodePoint(0xFE00 + byte); // Basic VS
    } else {
      encoded += String.fromCodePoint(0xE0100 + (byte - 16)); // Extended VS
    }
  }

  return encoded;
}
