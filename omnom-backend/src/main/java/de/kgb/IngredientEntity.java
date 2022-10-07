package de.kgb;

import com.vladmihalcea.hibernate.type.basic.PostgreSQLEnumType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity(name = "Ingredient")
@Table(name = "ingredients")
@TypeDef(
    name = "pgsql_enum",
    typeClass = PostgreSQLEnumType.class
)
public class IngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Integer ingredientID;

    @NotEmpty
    @Column(name = "designation")
    private String designation;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Type(type = "pgsql_enum")
    @Column(name = "unit")
    private Unit unit;

    @NotNull
    @Column(name = "is_stable")
    private Boolean stable;
}


