package de.kgb;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class Ingredient {

    @NotNull
    private Integer ingredientID;

    @NotBlank
    private String designation;

    @NotNull
    private Unit unit;

    @NotNull
    private Boolean stable;
}
