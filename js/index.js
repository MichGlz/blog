function getPost() {
  /*----------get------------------------*/
  fetch("https://reicpe-9cc2.restdb.io/rest/posts", {
    method: "GET",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
    },
  })
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
  console.log(posts);
  //grab the template
  const template = document.querySelector("template.postMenu").content;

  posts.forEach((post) => {
    //clone
    const copy = template.cloneNode(true);
    //adjust stuff
    copy.querySelector("h2").textContent = post.title;
    copy.querySelector("h3 span").textContent = post.username;
    copy.querySelector("a.readMore").href = `article.html?article=${post._id}`;
    //append
    document.querySelector(".listwraper").appendChild(copy);
  });
}

function postPost() {
  /*----------------------post----------------*/

  fetch("https://reicpe-9cc2.restdb.io/rest/posts", {
    method: "POST",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
      "Content-Type": "application/json",
    },
    body:
      '{"title":"Hola","username":"migu03","approved":false,"content":"hola mundo 2"}',
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
  /*--------------------------------------------*/
}

function deletePost() {
  /*--------------delete-----------------------*/

  fetch("https://reicpe-9cc2.restdb.io/rest/posts/606d74973e2851510000523b", {
    method: "DELETE",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });

  /*-----------------------------------------------*/
}

function patchPost() {
  /*------------------patch----------------------*/
  fetch("https://reicpe-9cc2.restdb.io/rest/posts/606d72353e285151000051e2", {
    method: "PATCH",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
      "Content-Type": "application/json",
    },
    body:
      '{"_id":"606d72353e285151000051e2","title":"Insomnia","username":"se03","content":"hola mundo form insomnia","_created":"2021-04-07T08:49:57.160Z","_changed":"2021-04-07T09:30:14.718Z","_createdby":"api","_changedby":"api","_keywords":["api","insomnia","se03","hola","mundo","form"],"_tags":"api insomnia se03 hola mundo form","_version":3,"approved":false}',
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
  /*----------------------------------------------------------------------------*/
}
