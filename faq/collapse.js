var collapseables = document.querySelectorAll("button.collapseable");

for (var i = 0; i < collapseables.length; i++) {
  collapseables[i].onclick = function() {
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");
  };
}

function closeAll() {
  for (var i = 0; i < collapseables.length; i++) {
    collapseables[i].classList.remove("active");
    collapseables[i].nextElementSibling.classList.remove("show");
  }
}
