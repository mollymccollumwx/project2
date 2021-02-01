$(document).ready(function () {
  const breedSelection = $("#breed-selection");
  const APIkey = "b28e0896-2cdc-40c9-bc2a-b043817011ed";
  $.ajax({
    url:
      "https://cors-anywhere.herokuapp.com/https://api.thedogapi.com/v1/breeds",
    headers: { Authorization: APIkey },
    method: "GET",
  }).then((response) => {
    for (let i = 0; i < response.length; i++) {
      const newOption = $("<option>");
      newOption.text(response[i].name);
      breedSelection.append(newOption);
    }
  });

  const fileInput = document.querySelector("#dog-file input[type=file]");
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector("#dog-file .file-name");
      fileName.textContent = fileInput.files[0].name;
    }
  };

  // $(document).on("submit", "#submit-form", handleUserFormSubmit);

  $("#submit-form").on("click", function (event) {
    event.preventDefault();

    const newUser = {
      email: $("#email").val().trim(),
      password: $("#password").val().trim(),
      ownerFirstName: $("#owner-first-name").val().trim(),
      ownerLastName: $("#owner-last-name").val().trim(),
      dogName: $("#dog-name").val().trim(),
      city: $("#city").val().trim(),
      dogBreed: $("#breed-selection").val(),
      dogAge: $("#dog-age").val(),
      dogSize: $("#dog-size").val(),
      dogVaccinated: $("#vaccinated:checked").val(),
      friendliness: $("input[name=question]:checked", "#friendliness").val(),
    };

    // Add new user to database
    $.post("/api/signup", newUser).then((newUser) => {
        console.log(newUser);
        var form = new FormData();
        form.append("photo", fileInput.files[0], "file");

        var settings = {
          url: "/upload/" + newUser.id,
          method: "POST",
          timeout: 0,
          processData: false,
          mimeType: "multipart/form-data",
          contentType: false,
          data: form,
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
        });
        // window.open("/dashboard", "_self");
    });
  });
});
