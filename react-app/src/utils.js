//base64String upload

export async function imageUploaded(file) {
  let reader = new FileReader();
  let base64String;
  reader.onload = function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    return base64String;
  };
  reader.readAsDataURL(file);
}

//base64ToImg
function imageShow(img, file) {
  let reader = new FileReader();
  reader.onload(() => {
    img.src = reader.result;
  });
  if (file) {
    reader.readAsDataURL(file);
  }
}
