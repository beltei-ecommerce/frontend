import http from ".";

export async function getFileByNameAPI(filename) {
  return http.get(`/images/${filename}`, {
    responseType: "arraybuffer",
  });
}

export async function getImageByNameAPI(filename) {
  try {
    const file = await getFileByNameAPI(filename);
    return `data:image/png;base64,${window.btoa(
      new Uint8Array(file).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    )}`;
  } catch {
    return null;
  }
}
