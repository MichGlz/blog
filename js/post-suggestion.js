const form = document.querySelector("form.post-suggestion");
console.log(form.elements.title);

form.elements.title.focus();
form.addEventListener("submit", userSubmited);

function userSubmited(e) {
  e.preventDefault();

  console.log(form.elements.title.value);
  console.log(form.elements.username.value);
  console.log(form.elements.comment.value);

  const payload = {
    title: form.elements.title.value,
    username: form.elements.username.value,
    content: form.elements.comment.value,
  };

  document.querySelector("input[type=submit]").disabled = true;
  postPost(payload);
}

function postPost(payload) {
  /*----------------------post----------------*/

  fetch("https://reicpe-9cc2.restdb.io/rest/posts", {
    method: "POST",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      uploadComment();
    })
    .catch((err) => {
      console.error(err);
    });
}

function uploadComment() {
  document.querySelector("input[type=submit]").disabled = false;
  form.elements.title.value = "";
  form.elements.username.value = "";
  form.elements.comment.value = "";
  document.querySelector("#submitSMS").classList.remove("hidden");
}
