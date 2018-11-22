(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


// The modal js starts

function showModal() {
  resetModal();
  document.getElementById('myModal').style.display = "block";
}

function closeModal() {  
  document.getElementById('myModal').style.display = "none";
}

function resetModal() {
  document.getElementById('modaltext').innerHTML = "Content";
  document.getElementById('modalheadertext').innerHTML = "Modal Header";
  document.getElementById('modalheader').style.backgroundColor = "cornflowerblue;";
  document.getElementById('modalfooter').style.backgroundColor = "cornflowerblue;";
}

function modalSuccess() {
  resetModal();
  document.getElementById('myModal').style.display = "block";
  document.getElementById('modalheadertext').innerHTML = "DONE";
  document.getElementById('modalheader').style.backgroundColor = "green";
  document.getElementById('modalfooter').style.backgroundColor = "green";
}

function modalError() {
  resetModal();
  document.getElementById('myModal').style.display = "block";
  document.getElementById('modalheadertext').innerHTML = "ERROR";
  document.getElementById('modalheader').style.backgroundColor = "red";
  document.getElementById('modalfooter').style.backgroundColor = "red";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById('myModal');
  if (event.target == modal) {
    closeModal();
  }
}

function modalSubmit() {
  showModal();
  document.getElementById('modalheadertext').innerHTML = "SUCCESS";
  document.getElementById('modaltext').innerHTML = "<p class='col-md-12'>Your message has been sent successfully. Thank you, I will contact you shortly.</p><button class='btn btn-secondary btn-lg' onclick='closeModal()'>OK</button>";
}

function AJAXform() {
  var formURL = "controller/contact.php";
  $.ajax({
    url: formURL,
    method: 'post',
    data: $('#webform').serialize(),
    datatype: 'json',
    success: function(data) {
      if(data.status == 'success') {
        modalSuccess();
        document.getElementById('modaltext').innerHTML = "<p class='col-md-12'> Thank you "+ data.name +", your message has been sent successfully. I will contact you shortly.</p><button class='btn btn-secondary btn-lg' onclick='closeModal()'>OK</button>";
      } 
      if (data.status == 'error') {
        modalError();
        document.getElementById('modaltext').innerHTML = "<p class='col-md-12'>Sorry, your message can not be sent, please contact me directly.</p><button class='btn btn-secondary btn-lg' onclick='closeModal()'>OK</button>";
      }
      if (data.status == 'empty') {
        modalError();
        document.getElementById('modaltext').innerHTML = "<p class='col-md-12'>Please fill all the input fields in the form.</p><button class='btn btn-secondary btn-lg' onclick='closeModal()'>OK</button>";
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

//The modal js ends