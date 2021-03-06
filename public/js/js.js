$(document).ready(function() {
  // *****************************************************************
  // GATE KEEPER
  // *****************************************************************

  $("#signUp").on("click", function(event) {
    event.preventDefault();
    var newAccount = {
      name: $("#nameUp")
        .val()
        .trim(),
      email: $("#emailUp")
        .val()
        .trim(),
      account_key: $("#passwordUp")
        .val()
        .trim(),
      account_key2: $("#passwordConfirm")
        .val()
        .trim()
    };
    if (
      newAccount.account_key.length > 0 &&
      newAccount.email.length > 0 &&
      newAccount.account_key2.length > 0 &&
      newAccount.name.length > 0
    ) {
      if (newAccount.account_key === newAccount.account_key2) {
        $.post("/signup", newAccount, function() {
          window.location.href = "/";
        });
      } else {
        console.log("**passwords don't match**");
        $("#create-err-msg")
          .empty("")
          .text("**Passwords don't match**");
      }
    } else {
      console.log("**Please fill out entire form**");
      $("#create-err-msg")
        .empty("")
        .text("**Please fill out entire form**");
    }
  });

  $("#signIn").on("click", function(event) {
    event.preventDefault();
    var user = {
      email: $("#emailIn")
        .val()
        .trim(),
      account_key: $("#passwordIn")
        .val()
        .trim()
    };
    $.post("/login", user, function(results) {
      if (results) {
        $(location).attr("href", "/viewuser");
        console.log("logged in on the front end");
      } else {
        console.log("oops something went wrong, please try again!");
      }
    });
  });

  $("#users").on("click", function() {
    $(location).attr("href", "/");
  });

  // logout
  $("#logout").on("click", function() {
    $.ajax("/logout", {
      method: "PUT"
    }).then(console.log("you've been logged out"));
  });

  // *****************************************************************
  // CREATE WISH LIST
  // *****************************************************************

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newWishList = {
      item: $("#item").val(),
      category: $("#category").val(),
      price: $("#price").val(),
      comments: $("#comments").val()
    };
    // Send the POST request.
    $.ajax("/api/gifts/", {
      type: "POST",
      data: newWishList
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // *****************************************************************
  // DELETE ITEM FROM WISH LIST
  // *****************************************************************

  $(".delete").on("click", function() {
    var id = $(this)
      .parent()
      .attr("data-id");

    // Send the DELETE request.
    $.ajax("/api/gifts/" + id, {
      type: "DELETE"
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  // *****************************************************************
  // VIEW FRIENDS LIST
  // *****************************************************************

  $(".viewFriend").on("click", function() {
    location.href = "/api/userwish";
  });

  // *****************************************************************
  // VIEW MY GIFT LIST
  // *****************************************************************

  $("#createRegistry").on("click", function() {
    $.get("/api/gifts/").then(function() {
      location.href = "/api/gifts/";
    });
  });

  $(".viewShopping").on("click", function() {
    $.get("/api/cart/").then(function() {
      location.href = "/api/cart/";
    });
  });

  // *****************************************************************
  // ADD TO SHOPPING CART
  // *****************************************************************
  $("#wishList").on("click", ".shopping", function() {
    var dataObject = {
      data: $(this).attr("data-item"),
      id: $(this).attr("data-id"),
      callback: (function() {
        location.reload();
      })()
    };
    $.ajax("/add-to-cart", {
      type: "PUT",
      data: dataObject
    });
  });

  $("#shoppingList").on("click", ".nevermind", function() {
    var dataObject = {
      data: $(this).attr("data-item"),
      id: $(this).attr("data-id")
    };
    $.ajax("/drop-from-cart", {
      type: "PUT",
      data: dataObject,
      callback: (function() {
        location.reload();
      })()
    }).then(function(added) {
      location.reload();
    });
  });

  // ****************BUTTON FOR EACH USER************************

  $(document).on("click", ".seeGifts", function() {
    event.preventDefault();
    var uuid = $(this).attr("data-uuid");
    $.get("/api/view/" + uuid).then(function() {
      location.href = "/api/view/" + uuid;
    });
  });
});
