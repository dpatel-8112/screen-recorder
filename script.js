const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
let recorder, stream;

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });



  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  start.removeAttribute("class");
  stop.removeAttribute("disabled");
  stop.setAttribute("class", "button");

  startRecording();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  stop.removeAttribute("class");
  start.removeAttribute("disabled");
  start.setAttribute("class","button");
  
  recorder.stop();
  stream.getVideoTracks()[0].stop();
});
