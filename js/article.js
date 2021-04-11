const urlParams = new URLSearchParams(window.location.search);

const articleId = urlParams.get("article");

let comments;

/*----------get------------------------*/
fetch(
  "https://reicpe-9cc2.restdb.io/rest/posts/" +
    articleId +
    "?fetchchildren=true",
  {
    method: "GET",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
    },
  }
)
  .then((res) => res.json())
  .then((response) => {
    showPosts(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPosts(post) {
  console.log(post);

  document.querySelector(".articlePage h2 span").textContent = post.username;
  document.querySelector(".articlePage h1").textContent = post.title;
  document.querySelector("img.articleImage").src = post.imageUrl;
  document.querySelector(".articlePage p").textContent = post.content;
  console.log(post.content);

  comments = post.comments;
  showComments(comments);
}

function showComments(comments) {
  console.log(comments);
  //grab the template
  const template = document.querySelector("template.commentPost").content;

  comments.forEach((comment) => {
    //clone
    const copy = template.cloneNode(true);
    //adjust stuff
    copy.querySelector(".comment h3 span").textContent = comment.username;
    copy.querySelector(".comment p").textContent = comment.content;
    //append
    document.querySelector("ul.commentList").appendChild(copy);
  });
}

function slideIn() {
  document.querySelector("div.formcontainer").classList.toggle("slideIn");

  console.log(document.querySelector("#parentId").value);
}

//----------------------post comment-------------------------------------
const form = document.querySelector("form.let-comment");
console.log(form.elements.email);

form.elements.email.focus();
form.addEventListener("submit", userSubmited);

function userSubmited(e) {
  e.preventDefault();
  document.querySelector("#parentId").value = articleId;
  console.log(form.elements.email.value);
  console.log(form.elements.username.value);
  console.log(form.elements.comment.value);
  console.log(form.elements.parentId.value);

  const payload = {
    email: form.elements.email.value,
    username: form.elements.username.value,
    content: form.elements.comment.value,
    _parent_id: form.elements.parentId.value,
  };

  document.querySelector("input[type=submit]").disabled = true;
  postPost(payload);
}

function postPost(payload) {
  /*----------------------post----------------*/

  fetch("https://reicpe-9cc2.restdb.io/rest/comments", {
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
      refreshComments();
    })
    .catch((err) => {
      console.error(err);
    });
}

function uploadComment() {
  document.querySelector("input[type=submit]").disabled = false;
  form.elements.email.value = "";
  form.elements.username.value = "";
  form.elements.comment.value = "";
}

function refreshComments() {
  fetch(
    // "https://reicpe-9cc2.restdb.io/rest/posts/" +
    //   articleId +
    //   "?fetchchildren=true",
    `https://reicpe-9cc2.restdb.io/rest/comments?q={"_parent_id":"${articleId}"}&h={"$orderby": {"_created": 1}}`,

    {
      method: "GET",
      headers: {
        "x-apikey": "606d5dcef5535004310074f4",
      },
    }
  )
    .then((res) => res.json())
    .then((response) => {
      // comments = response.comments;
      comments = response;
      const articles = document.querySelectorAll(".commentsContainer article");
      articles.forEach((article) => {
        article.remove();
      });
      showComments(comments);
    })
    .catch((err) => {
      console.error(err);
    });
}
