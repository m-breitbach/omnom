package de.kgb;

import io.quarkus.security.identity.SecurityIdentity;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.util.Objects;

@Slf4j
@Path("/ingredients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "ingredients", description = "Ingredient operations")
public class IngredientResource {

    @Inject
    IngredientService ingredientService;

    @Inject
    SecurityIdentity identity;

    @GET
    @APIResponse(
        responseCode = "200",
        description = "Get all ingredients",
        content = @Content(
            mediaType = MediaType.APPLICATION_JSON,
            schema = @Schema(type = SchemaType.ARRAY, implementation = Ingredient.class)
        )
    )
    public Response get() {
        log.info(identity.toString());
        return Response.ok(ingredientService.findAll()).build();
    }

    @GET
    @Path("/{ingredientID}")
    @APIResponse(
        responseCode = "200",
        description = "Get ingredient by ID",
        content = @Content(
            mediaType = MediaType.APPLICATION_JSON,
            schema = @Schema(type = SchemaType.OBJECT, implementation = Ingredient.class)
        )
    )
    @APIResponse(
        responseCode = "404",
        description = "No ingredient found for provided ID",
        content = @Content(mediaType = MediaType.APPLICATION_JSON)
    )
    public Response getById(@Parameter(required = true) @PathParam("ingredientID") Integer ingredientID) {

        return ingredientService.findById(ingredientID)
            .map(ingredient -> Response.ok(ingredient).build())
            .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }

    @POST
    @APIResponse(
        responseCode = "201",
        description = "Ingredient created",
        content = @Content(
            mediaType = MediaType.APPLICATION_JSON,
            schema = @Schema(type = SchemaType.OBJECT, implementation = Ingredient.class)
        )
    )
    @APIResponse(
        responseCode = "400",
        description = "Invalid ingredient",
        content = @Content(mediaType = MediaType.APPLICATION_JSON)
    )
    @APIResponse(
        responseCode = "400",
        description = "Ingredient already exists for provided ID",
        content = @Content(mediaType = MediaType.APPLICATION_JSON)
    )
    public Response post(
        @NotNull @Valid Ingredient ingredient,
        @Context UriInfo uriInfo
    ) {

        ingredientService.save(ingredient);
        return Response
            .created(uriInfo.getAbsolutePathBuilder().path(ingredient.getIngredientID().toString()).build())
            .entity(ingredient) // TODO: why put domain here?
            .build();
    }

    @PUT
    @Path("/{ingredientID}")
    @APIResponse(
        responseCode = "204",
        description = "Ingredient updated",
        content = @Content(
            mediaType = MediaType.APPLICATION_JSON,
            schema = @Schema(type = SchemaType.OBJECT, implementation = Ingredient.class)
        )
    )
    @APIResponse(
        responseCode = "400",
        description = "Invalid ingredient",
        content = @Content(mediaType = MediaType.APPLICATION_JSON)
    )
    @APIResponse(
        responseCode = "400",
        description = "Ingredient ID mismatch",
        content = @Content(mediaType = MediaType.APPLICATION_JSON)
    )
    @APIResponse(
        responseCode = "404",
        description = "No ingredient found for provided ID",
        content = @Content(mediaType = MediaType.APPLICATION_JSON)
    )
    public Response put(
        @Parameter(required = true) @PathParam("ingredientID") Integer ingredientID,
        @NotNull @Valid Ingredient ingredient
    ) {
        if (!Objects.equals(ingredientID, ingredient.getIngredientID())) {
            throw new ServiceException("Ingredient ID mismatch");
        }

        ingredientService.update(ingredient);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @DELETE
    @Path("/{ingredientID}")
    @APIResponse(
        responseCode = "204",
        description = "Ingredient deleted",
        content = @Content(
            mediaType = MediaType.APPLICATION_JSON,
            schema = @Schema(type = SchemaType.OBJECT, implementation = Ingredient.class)
        )
    )
    @APIResponse(
        responseCode = "404",
        description = "No ingredient found for provided ID",
        content = @Content(mediaType = MediaType.APPLICATION_JSON)
    )
    public Response delete(
        @Parameter(required = true) @PathParam("ingredientID") Integer ingredientID,
        @NotNull @Valid Ingredient ingredient
    ) {
        ingredientService.deleteById(ingredientID);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

}
