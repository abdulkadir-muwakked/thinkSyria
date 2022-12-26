const display = document.getElementById("display");
display.innerHTML = "";
const btns = Array.from(document.getElementsByClassName("button"));
btns.map((btn) => {
  btn.addEventListener("click", (e) => {
    switch (btn.innerHTML) {
      case "C":
        display.innerHTML = "";
        break;
      case "←":
        display.innerHTML = display.innerHTML.slice(0, -1);
        break;
      case "=":
        if (display.innerHTML != "")
          display.innerHTML = eval(display.innerHTML);
        break;
      default:
        display.innerHTML += btn.innerHTML;
    }
  });
});
