(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

// AOS animation
AOS.init({
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 1500, // values from 0 to 3000, with step 50ms
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
});

// The modal js starts

function showModal() {
  resetModal();
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

function resetModal() {
  document.getElementById("modaltext").innerHTML = "Content";
  document.getElementById("modalheadertext").innerHTML = "Modal Header";
  document.getElementById("modalheader").style.backgroundColor = "cornflowerblue;";
  document.getElementById("modalfooter").style.backgroundColor = "cornflowerblue;";
}

function modalSuccess() {
  resetModal();
  document.getElementById("myModal").style.display = "block";
  document.getElementById("modalheadertext").innerHTML = "DONE";
  document.getElementById("modalheader").style.backgroundColor = "green";
  document.getElementById("modalfooter").style.backgroundColor = "green";
}

function modalError() {
  resetModal();
  document.getElementById("myModal").style.display = "block";
  document.getElementById("modalheadertext").innerHTML = "ERROR";
  document.getElementById("modalheader").style.backgroundColor = "red";
  document.getElementById("modalfooter").style.backgroundColor = "red";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    closeModal();
  }
};

//The modal js ends

function AJAXform() {
  var formURL = "controller/mail.php";
  $.ajax({
    url: formURL,
    method: "post",
    data: $("#webform").serialize(),
    datatype: "json",
    success: function (data) {
      if (data.status == "success") {
        modalSuccess();
        document.getElementById("modaltext").innerHTML = "<p class='col-md-12'> Thank you " + data.name + ", your message has been sent successfully.</p><button class='btn btn-secondary btn-lg' onclick='closeModal()'>OK</button>";
      }
      if (data.status == "error") {
        modalError();
        document.getElementById("modaltext").innerHTML = "<p class='col-md-12'>Sorry, your message can not be sent, please contact me directly.</p><button class='btn btn-secondary btn-lg' onclick='closeModal()'>OK</button>";
      }
      if (data.status == "empty") {
        modalError();
        document.getElementById("modaltext").innerHTML = "<p class='col-md-12'>Please fill all the input fields in the form.</p><button class='btn btn-secondary btn-lg' onclick='closeModal()'>OK</button>";
      }
    },
    error: function (err) {
      console.log(err);
    },
  });
}

// Load project data
var place_holder = document.getElementById("myprojects");
fetch("view/js/projects.json")
  .then(response => response.json())
  .then(projects => {
    // place_holder.innerHTML = null;
    projects.map((p, i) => {
      var delay = (i + 1) % 3 == 0 ? 800 : (i + 2) % 3 == 0 ? 600 : 400;
      var card = document.createElement("div");
      card.className += "col-md-4";
      card.setAttribute("data-aos", "flip-left");
      card.setAttribute("data-aos-delay", delay);
      card.innerHTML = `
        <div class="card my-3">
          <a target="_blank" href="${p.link}">
            <img src="view/images/${p.image}" class="card-img-top" alt="${p.title}" />
          </a>
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${p.subtitle}</h6>
            <hr/>
            <p class="card-text text-justify">${p.description}</p>
          </div>
          <div class="list-group list-group-flush">
            <div class="list-group-item text-center">
              <a target="_blank" href="${p.link}" class="card-link" title="Page Link"><i class="fas fa-2x fa-link"></i></a>
              ${p.repo ? `<a target="_blank" href="${p.repo}" class="card-link" title="Source Code"><i class="fab fa-2x fa-github"></i></a>` : ""}
              ${p["repo-b"] ? `<a target="_blank" href="${p["repo-b"]}" class="card-link" title="Decoupled Backend"><i class="fab fa-2x fa-github"></i></a>` : ""}
              ${p.docker ? `<a target="_blank" href="#" class="card-link"><i class="fab fa-2x fa-docker" title="Docker Hub Repo"></i></a>` : ""}
            </div>
          </div>
        </div>
      `;
      place_holder.appendChild(card);
    });
  })
  .catch(err => {
    console.log(err);
  });
