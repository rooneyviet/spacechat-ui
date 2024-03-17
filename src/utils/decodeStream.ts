export const decodeStream = async (stream: ReadableStream): Promise<string> => {
  let done = false;
  let chunk = 0;
  const decoder = new TextDecoder();
  let decodedString = "";

  const reader = stream.getReader();
  while (!done) {
    const { value, done: _done } = await reader.read();
    const chunkValue = decoder.decode(value, { stream: true });
    decodedString += chunkValue;
    if (!_done) {
      //console.log(`[chunk ${chunk}]`);
      //console.log(chunkValue);
    }

    done = _done;
    chunk++;
  }
  //console.log("decodeStream done", decodedString);
  return decodedString;
};
