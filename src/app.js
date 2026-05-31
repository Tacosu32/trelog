const musicFileInput = document.getElementById("music-file");
const musicFileName = document.getElementById("music-file-name");

musicFileInput.addEventListener("change", () => {
  const file = musicFileInput.files[0];
  musicFileName.textContent = file ? file.name : "未選択";
});
