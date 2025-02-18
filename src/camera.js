const cameraContainer = document.getElementById("camera-container");
const video = document.getElementById("video");

navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "environment" } })
  .then((stream) => {
    video.srcObject = stream;

    // video.addEventListener("loadedmetadata", () => {
    //   video.width = cameraContainer.offsetWidth;
    //   video.height = cameraContainer.offsetHeight;
    // });

    window.addEventListener("resize", () => {
      if (video && cameraContainer) {
        video.width = cameraContainer.offsetWidth;
        video.height = cameraContainer.offsetHeight;
      }
    });
  })
  .catch((error) => {
    console.error("Error accessing camera:", error);
  });
