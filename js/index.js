const urlParams = new URLSearchParams(window.location.search);

const articleId = urlParams.get("article");

let approveBtn;

if (articleId) {
  console.log(articleId);
  approveBtn = document.querySelector("a.btn");
  approveBtn.textContent = "Approve your article";
  approveBtn.href = "#";
  approveBtn.classList.add("alert");
  approveBtn.addEventListener("click", approveArticle);
}

let imageUrl;

function getPost() {
  /*----------get------------------------*/
  fetch(
    `https://reicpe-9cc2.restdb.io/rest/posts?q{}&h={"$orderby": {"_created": -1}}`,
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
}

getPost();

function showPosts(posts) {
  // console.log(posts);
  //grab the template
  const template = document.querySelector("template.postMenu").content;

  posts.forEach((post) => {
    //clone
    const copy = template.cloneNode(true);
    //adjust stuff
    let words = post.content;
    let word = words.split(" ");

    copy.querySelector("h2").textContent = post.title;
    copy.querySelector("h3 span").textContent = post.username;
    copy.querySelector("a.readMore").href = `article.html?article=${post._id}`;
    copy.querySelector("p.intro").textContent =
      word[0] +
      " " +
      word[1] +
      " " +
      word[2] +
      " " +
      word[3] +
      " " +
      word[4] +
      " " +
      word[5] +
      " ...";
    if (post.imageUrl) {
      imageArt = post.imageUrl;
    } else {
      imageArt =
        "https://images.unsplash.com/photo-1594171799689-5a716fd3acd4?auto=format&fit=crop&w=500&q=80";
    }
    copy.querySelector("img.frontPage").src = imageArt;
    if (!post.approved) {
      copy.querySelector("h4").textContent = "not approved";
      copy.querySelector("article").classList.add("purple");
      copy.querySelector("a.readMore").href = "#";
      copy.querySelector(
        "img.frontPage"
      ).src = `https://images.unsplash.com/photo-1516186049182-b29897c525d1?w=500&q=80`;
    }

    //append
    document.querySelector(".listwraper").appendChild(copy);
  });
}

function approveArticle() {
  console.log("approve");
  fetch(`https://reicpe-9cc2.restdb.io/rest/posts/${articleId}`, {
    method: "PATCH",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
      "Content-Type": "application/json",
    },
    body: '{"approved":true}',
  })
    .then((response) => {
      // console.log(response);
      window.open("index.html", "_self");
    })
    .catch((err) => {
      console.error(err);
    });
}
