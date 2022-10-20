import { AppDataSource } from './data-source';
import { Photo } from './entity/Photo';
import { User } from './entity/User';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await AppDataSource.manager.find(User);
    console.log('Loaded users: ', users);

    console.log(
      'Here you can setup and run express / fastify / any other framework.'
    );

    // Creating and inserting a photo into the database
    console.log('Inserting a new photo into the database...');
    const photo = new Photo();
    photo.name = 'Me and Bears';
    photo.description = 'I am near polar bears';
    photo.filename = 'photo-with-bears.jpg';
    photo.views = 1;
    photo.isPublished = true;

    await AppDataSource.manager.save(photo);
    console.log('Photo has been saved. Photo id is', photo.id);

    // Using Entity Manager
    const savedPhotos = await AppDataSource.manager.find(Photo);
    console.log('All photos from the db: ', savedPhotos);

    // Using Repositories
    const photo2 = new Photo();
    photo2.name = 'Me and Bears';
    photo2.description = 'I am near polar bears';
    photo2.filename = 'photo-with-bears.jpg';
    photo2.views = 1;
    photo2.isPublished = true;

    const photoRepository = AppDataSource.getRepository(Photo);

    await photoRepository.save(photo2);
    console.log('Photo has been saved');

    // Loading from the database
    const savedPhotos2 = await photoRepository.find();
    console.log('All photos from the db: ', savedPhotos2);

    const firstPhoto = await photoRepository.findOneBy({ id: 1 });
    console.log('First photo from the db: ', firstPhoto);

    const meAndBearsPhoto = await photoRepository.findOneBy({
      name: 'Me and Bears',
    });
    console.log('Me and Bears photo from the db: ', meAndBearsPhoto);

    const allViewedPhotos = await photoRepository.findBy({ views: 1 });
    console.log('All viewed photos: ', allViewedPhotos);

    const allPublishedPhotos = await photoRepository.findBy({
      isPublished: true,
    });
    console.log('All published photos: ', allPublishedPhotos);

    const [photos, photosCount] = await photoRepository.findAndCount();
    console.log('All photos: ', photos);
    console.log('Photos count: ', photosCount);

    // Updating in the database
    const photoToUpdate = await photoRepository.findOneBy({ id: 1 });
    photoToUpdate.name = 'Me, my friends and polar bears';
    await photoRepository.save(photoToUpdate);

    // Removing from the database
    const photoToRemove = await photoRepository.findOneBy({ id: 1 });
    await photoRepository.remove(photoToRemove);
  })
  .catch((error) => console.log(error));
