import * as ImagePicker from "expo-image-picker";

const getImagen = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    base64: true,
    quality: 1,
  });
  if (!result.cancelled) {
    let recorte = result.uri.split(".");
    let formato = recorte[recorte.length - 1];
    return `data:image/${formato};base64,${result.base64}`;
  }
};

const takeImagen = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
};

export { getImagen, takeImagen };
