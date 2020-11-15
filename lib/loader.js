document.onreadystatechange = function() { 
  if (document.readyState !== "complete") { 
      document.querySelector("body").style.visibility = "hidden"; 
      document.querySelector(".loading-wrapper").style.visibility = "visible"; 
  } else { 
    // setTimeout(function() { removeLoader(); }, 5000);
    removeLoader();
  } 
}; 


const removeLoader = () => {
  document.querySelector(".loading-wrapper").style.display = "none"; 
  document.querySelector("body").style.visibility = "visible"; 
}