const firstIngredient = {
  name: "Краторная булка N-200i",
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
};

const secondIngredient = {
  image: "https://code.s3.yandex.net/react/code/sauce-02.png",
};

const thirdIngredient = {
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
};

describe("Ordering a burger", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "postOrder"
    );

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken")
    );
    cy.setCookie("accessToken", "test-accessToken");
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("open & close modal card", () => {
    cy.visit("/");
    cy.get(".ingredientsSection ul li:first").click();
    cy.get('[data-testId="modalHolder"] > div > span').should(
      "have.text",
      firstIngredient.name
    );
    cy.get('[data-testId="modalHolder"] > div:has(h3) > svg').click();
    cy.get('[data-testId="modalHolder"]').should("not.exist");
  });

  it("drag ingredients", () => {
    cy.visit("/");

    cy.get(".ingredientsSection ul li:first").trigger("dragstart");
    cy.get('[data-testId="constructor"]').trigger("drop");
    cy.get(
      `[data-testId="constructor"] img[src="${firstIngredient.image}"]`
    ).should("have.length", 2);

    cy.get(".ingredientsSection ul")
      .eq(1)
      .find("li:first")
      .trigger("dragstart");
    cy.get('[data-testId="constructor"]').trigger("drop");
    cy.get(
      `[data-testId="constructor"] img[src="${secondIngredient.image}"]`
    ).should("have.length", 1);

    cy.get(".ingredientsSection ul")
      .eq(1)
      .find("li")
      .eq(1)
      .trigger("dragstart");
    cy.get('[data-testId="constructor"]').trigger("drop");
    cy.get(
      `[data-testId="constructor"] img[src="${thirdIngredient.image}"]`
    ).should("have.length", 1);

    cy.get('[data-testId="constructorButton"]').click();

    cy.get('[data-testId="modalHolder"] b:first').should("have.text", 123);

    cy.get('[data-testId="modalOverlay"]').click({ force: true });
    cy.get('[data-testId="modalHolder"]').should("not.exist");
  });
});
