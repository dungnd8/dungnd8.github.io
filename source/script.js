function clickSearch() {
  document.querySelector("#popup-search").style.display = "block";
  document
    .getElementById("popup-search")
    .addEventListener("click", function (e) {
      if (document.querySelector("#popup-search-section").contains(e.target)) {
      } else {
        document.querySelector("#popup-search").style.display = "none";
      }
    });
}
