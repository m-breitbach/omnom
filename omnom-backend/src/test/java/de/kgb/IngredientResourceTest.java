package de.kgb;

import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

@QuarkusTest
@TestHTTPEndpoint(IngredientResource.class)
class IngredientResourceTest {

    @Test
    void get_ShouldSucceed() {
        given()
            .when().get()
            .then().statusCode(200);
    }

    @Test
    void getById_ShouldReturnSavedObject() {
        Ingredient ingredient = createSomeIngredient();
        Ingredient saved = given()
            .contentType(ContentType.JSON)
            .body(ingredient)
            .post()
            .then().statusCode(201)
            .extract().as(Ingredient.class);
        Ingredient got = given()
            .when().get("/{ingredientID}", saved.getIngredientID())
            .then().statusCode(200)
            .extract().as(Ingredient.class);
        assertThat(saved).isEqualTo(got);
    }

    @Test
    void getById_ShouldFailOnMissingObject() {
        given()
            .when().get("/{ingredientID}", 99999)
            .then().statusCode(404);
    }

    @Test
    void post_ShouldCreateValidObject() {
        Ingredient ingredient = createSomeIngredient();
        Ingredient saved = given()
            .contentType(ContentType.JSON)
            .body(ingredient)
            .post()
            .then().statusCode(201)
            .extract().as(Ingredient.class);
        assertThat(saved.getIngredientID()).isNotNull();
    }

    @Disabled
    @Test
    void post_ShouldFailOnEmptyDesignation() {
        Ingredient ingredient = createSomeIngredient();
        ingredient.setDesignation("");
        given()
            .contentType(ContentType.JSON)
            .body(ingredient)
            .post()
            .then().statusCode(400);
    }

    @Test
    void put_ShouldSucceedOnValidUpdate() {
        Ingredient ingredient = createSomeIngredient();
        Ingredient saved = given()
            .contentType(ContentType.JSON)
            .body(ingredient)
            .post()
            .then().statusCode(201)
            .extract().as(Ingredient.class);
        saved.setDesignation("Updated designation");
        given()
            .contentType(ContentType.JSON)
            .body(saved)
            .put("/{ingredientID}", saved.getIngredientID())
            .then().statusCode(204);
    }

    @Disabled
    @Test
    void put_ShouldFailOnEmptyDesignation() {
        Ingredient ingredient = createSomeIngredient();
        Ingredient saved = given()
            .contentType(ContentType.JSON)
            .body(ingredient)
            .post()
            .then().statusCode(201)
            .extract().as(Ingredient.class);
        saved.setDesignation("");
        given()
            .contentType(ContentType.JSON)
            .body(saved)
            .put("/{ingredientID}", saved.getIngredientID())
            .then().statusCode(400);
    }

    @Test
    void put_ShouldFailOnIdMismatch() {
        Ingredient ingredient = createSomeIngredient();
        Ingredient saved = given()
            .contentType(ContentType.JSON)
            .body(ingredient)
            .post()
            .then().statusCode(201)
            .extract().as(Ingredient.class);
        saved.setIngredientID(saved.getIngredientID() + 1);
        given()
            .contentType(ContentType.JSON)
            .body(saved)
            .put("/{ingredientID}", saved.getIngredientID())
            .then().statusCode(400);
    }

    private Ingredient createSomeIngredient() {
        Ingredient ingredient = new Ingredient();
        ingredient.setDesignation("Some designation");
        ingredient.setUnit(Unit.PIECES);
        ingredient.setStable(Boolean.TRUE);
        return ingredient;
    }
}
