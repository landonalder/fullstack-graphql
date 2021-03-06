/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
    Query: {
        pets: (_, { input }, { models }) => {
            return models.Pet.findMany(input);
        },
        pet: (_, { input }, { models }) => {
            const filter = input ? { id: parseInt(input.id) } : undefined;
            return models.Pet.findOne(filter);
        },
        user: (_, __, { models }) => {
            return models.User.findOne();
        },
    },
    Mutation: {
        createPet: (_, { input }, { models }) => {
            return models.Pet.create(input);
        },
        deletePet: async (_, { petId }, { models }) => {
            const deletedPetId = await models.Pet.delete(petId);
            return { id: deletedPetId };
        },
        updatePet: (_, { input }, { models }) => {
            return models.Pet.update(input);
        },
    },
    Pet: {
        img: (pet) => (pet.type === 'DOG' ? 'https://placedog.net/300/300' : 'http://placekitten.com/300/300'),
        owner: (pet, _, { models }) => models.User.findOne({ id: pet.user }),
        toys: async (pet, _, { models }) => {
            const toys = await models.Toy.findMany({ pet_id: pet.id });

            return toys.map(({ name }) => name).join(', ');
        },
    },
    User: {
        pets: (user, _, { models }) => models.Pet.findMany({ user: user.id }),
    },
};
