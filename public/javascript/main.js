const logout = document.getElementById("logout-link");
if (logout) {
  logout.addEventListener("click", async (event) => {
    await fetch("/api/user/logout");
    document.location.replace("/");
  });
}

window.onload=function(){
  var canvas = document.getElementById("source");
  var context = canvas.getContext("2d");
  
  /* Showing a single image with imagefx */
  //context.drawImage(document.getElementById('img4'),0,0);

  /* iterates through the images every second */
  /* displaying each as the main large image */
  
  let imageArr = ['img1', 'img2', 'img3', 'img4'];
  let index = 0;
  var timeInterval = setInterval( () => {
    index == imageArr.length? index = 0: index++;
    context.drawImage(document.getElementById(imageArr[index]),0,0);
  }, 1000);
  

}
