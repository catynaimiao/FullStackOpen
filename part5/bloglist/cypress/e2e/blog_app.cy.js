beforeEach(function () {
  cy.request("POST", "http://localhost:3003/api/testing/reset");
  // create here a user to backend
  const user = {
    name: "Matti Luukkainen",
    username: "mluukkai",
    password: "salainen",
  };
  cy.request("POST", "http://localhost:3003/api/users/", user);
  cy.visit("http://localhost:3000");
});

describe("Blog app", function () {
  describe("without logged in", function () {
    it("Login form is shown", function () {
      cy.contains("blogs");
      cy.contains("login").click();
    });

    it("succeeds with correct credentials", function () {
      cy.get("#loginFormUsername").type("mluukkai");
      cy.get("#loginFormPassword").type("salainen");
      cy.get("#loginFormLoginButton").click();

      cy.get(".success").should("contain", "Matti Luukkainen login successful");
    });

    it("fails with wrong credentials", function () {
      cy.get("#loginFormUsername").type("mluukkai");
      cy.get("#loginFormPassword").type("wrong");
      cy.get("#loginFormLoginButton").click();

      cy.get(".error").should("contain", "wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("input[name='Title']").type("a new Test Blog");
      cy.get("input[name='Author']").type("cypress");
      cy.get("input[name='Url']").type("cypress.org");
      cy.contains("create").click();
      cy.contains("a new Test Blog");
    });

    it(" a test that confirms users can like a blog", function () {
      cy.createBlog({
        title: "another blog cypress",
        author: "cypress",
        url: "cypress.org",
      });

      cy.contains("another blog cypress").contains("view").click();
      cy.contains("another blog cypress").parent().contains("like").click();
    });
    //5.21: bloglist end to end testing, step5
    it("user who created a blog can delete it", function () {
      cy.createBlog({
        title: "Blog should be Delete",
        author: "cypress",
        url: "cypress.org",
      });

      cy.contains("Blog should be Delete").contains("view").click();
      cy.contains("Blog should be Delete").parent().contains("remove").click();
      cy.get("html").should("not.contain", "Blog should be Delete");
    });

    it("other users cannot delete the blog", function () {
      cy.createBlog({
        title: "Blog should be Delete",
        author: "cypress",
        url: "cypress.org",
      });
      cy.contains("logout").click;
      const user = {
        name: "Matti Luukkainen2",
        username: "mluukkai2",
        password: "salainen2",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.login({ username: "mluukkai2", password: "salainen2" });
      cy.contains("Blog should be Delete").contains("view").click();
      cy.contains("Blog should be Delete").parent().contains("remove").click();
      cy.get("html").should("contain", "Blog should be Delete");
    });

    it.only("blog with the most likes being first", function () {
      cy.createBlog({
        title: "the fist blog",
        author: "cypress",
        url: "cypress.org",
      });
      cy.createBlog({
        title: "the second blog",
        author: "cypress",
        url: "cypress.org",
      });
      cy.contains("the fist blog").contains("view").click();
      cy.contains("the second blog").contains("view").click();

      cy.get(".blog")
        .contains("the fist blog")
        .parent()
        .contains("like")
        .as("fistLike");
      cy.get(".blog")
        .contains("the second blog")
        .parent()
        .contains("like")
        .as("secondLike");

      cy.get("@fistLike").click();
      cy.get("@fistLike").click();

      cy.get(".blog").eq(0).should("contain", "the fist blog");
      cy.get(".blog").eq(1).should("contain", "the second blog");

      cy.get("@secondLike").click();
      cy.get("@secondLike").click();
      cy.get("@secondLike").click();

      cy.get(".blog").eq(0).should("contain", "the second blog");
      cy.get(".blog").eq(1).should("contain", "the fist blog");
    });
  });
});
