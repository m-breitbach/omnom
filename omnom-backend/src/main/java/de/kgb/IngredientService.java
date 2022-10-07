package de.kgb;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Slf4j
@ApplicationScoped
public class IngredientService {

    @Inject
    IngredientRepository repository;

    @Inject
    IngredientMapper mapper;

    public List<Ingredient> findAll() {
        log.info("IngredientService::findAll");

        return mapper.toDomainList(repository.findAll().list());
    }

    public Optional<Ingredient> findById(@NonNull Integer ingredientID) {
        log.info("IngredientService::findById({})", ingredientID);

        return repository.findByIdOptional(ingredientID)
                .map(mapper::toDomain);
    }

    @Transactional
    public void save(@Valid Ingredient ingredient) {
        log.info("IngredientService::save({})", ingredient);

        IngredientEntity entity = mapper.toEntity(ingredient);
        repository.persist(entity);
        mapper.updateDomain(ingredient, entity);
    }

    @Transactional
    public void update(@Valid Ingredient ingredient) {

        Optional<IngredientEntity> optional = repository.findByIdOptional(ingredient.getIngredientID());
        if ( optional.isEmpty() ) {
            throw new ServiceException("No ingredient found for ID [%s]", ingredient.getIngredientID());
        }

        IngredientEntity entity = optional.get();
        mapper.updateEntity(entity, ingredient);
        repository.persist(entity);
        mapper.updateDomain(ingredient, entity);
    }

}
