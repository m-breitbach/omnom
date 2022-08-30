package de.kgb;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "cdi")
public interface IngredientMapper {

    Ingredient toDomain(IngredientEntity entity);
    IngredientEntity toEntity(Ingredient domain);

    List<Ingredient> toDomainList(List<IngredientEntity> entityList);
    List<IngredientEntity> toEntityList(List<Ingredient> domainList);

    void updateDomain(@MappingTarget Ingredient domain, IngredientEntity entity);
    void updateEntity(@MappingTarget IngredientEntity entity, Ingredient domain);
}

