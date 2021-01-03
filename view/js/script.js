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
        document.getElementById("modaltext").innerHTML = "<p class='col-md-12'> Thank you " + data.name + ", your message has been sent successfully. I will contact you shortly.</p><button class='btn btn-secondary btn-lg' onclick='closeModal()'>OK</button>";
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
    place_holder.innerHTML = null;
    projects.map(p => {
      var card = document.createElement("div");
      card.classList.add("col-md-4");
      card.innerHTML = `
        <h4>${p.title}</h4>
        <div class="row thumbnail slideanim">
          <a target="_blank" href="${p.link}">
            <img src="view/images/${p.image}" alt="${p.title}" />
            <div class="overlay">
              <div class="text">
                <i class="fas fa-external-link-square-alt"></i>
                <br />external link
              </div>
            </div>
          </a>
        </div>
        <div class="row slideanim">
          <div class="col-md-12 extlinks">
            <a target="_blank" href="${p.link}" title="Webpage">
              <span>
                <i class="fas fa-link"></i>
              </span>
            </a>
            <a target="_blank" href="${p.repo}" title="Source Code">
              <span>
                <i class="fab fa-github"></i>
              </span>
            </a>
          </div>
        </div>
        <div class="row caption slideanim">
          <div class="col-md-12">
            <p>${p.description}</p>
          </div>
        </div>
      `;
      place_holder.appendChild(card);
    });
  })
  .catch(err => {
    console.log(err);
  });
