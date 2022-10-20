import { AppDataSource } from './data-source';
import { Photo } from './entity/Photo';
import { PhotoMetadata } from './entity/PhotoMetadata';
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
    const photo1 = new Photo();
    photo1.name = 'Me and Bears';
    photo1.description = 'I am near polar bears';
    photo1.filename = 'photo-with-bears.jpg';
    photo1.views = 1;
    photo1.isPublished = true;

    await AppDataSource.manager.save(photo1);
    console.log('Photo has been saved. Photo id is', photo1.id);

    // Using Entity Manager
    const savedPhotos = await AppDataSource.manager.find(Photo);
    console.log('All photos from the db: ', savedPhotos);

    // Using2 Repositories
    const photo2 = new Photo();
    photo2.name2 = 'Me and Bears';
    photo2.description = 'I am near polar bears';
    photo2.filename = 'photo-with-bears.jpg';
    photo2.views = 1;
    photo2.isPublished = true;2

    const photoRepository2 = AppDataSource.getRepository(Photo);

    await photoRepository2.save(photo2);2
    console.log('Photo has been saved');

    // Loading from the database
    const savedPhotos2 = await photoRepository2.find();
    console.log('All photos from the db: ', savedPhotos2);

    const firstPhoto = await photoRepository2.findOneBy({ id: 1 });
    console.log('First photo from the db: ', firstPhoto);

    const meAndBearsPhoto = await photoRepository2.findOneBy({
      name: 'Me and Bears',
    });
    console.log('Me and Bears photo from the db: ', meAndBearsPhoto);

    const allViewedPhotos = await photoRepository2.findBy({ views: 1 });
    console.log('All viewed photos: ', allViewedPhotos);

    const allPublishedPhotos = await photoRepository2.findBy({
      isPublished: true,
    });
    console.log('All published photos: ', allPublishedPhotos);

    const [photos, photosCount] = await photoRepository2.findAndCount();
    console.log('All photos: ', photos);
    console.log('Photos count: ', photosCount);

    // Updating in the database
    const photoToUpdate = await photoRepository2.findOneBy({ id: 1 });
    photoToUpdate.name = 'Me, my friends and polar bears';
    await photoRepository2.save(photoToUpdate);

    // Removing from the database
    const photoToRemove = await photoRepository2.findOneBy({ id: 1 });
    await photoRepository2.remove(photoToRemove);

    // Save a one-to-one relation
    // create a photo
    const photo3 = new Photo();
    photo3.name = 'Me and Bears';
    photo3.description = 'I am near polar bears';
    photo3.filename = 'photo-with-bears.jpg';
    photo3.views = 1;
    photo3.isPublished = true;

    // create a photo metadata
    const metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = 'cybershoot';
    metadata.orientation = 'portrait';
    metadata.photo = photo3; // this way we connect them

    // get entity repositories
    const photoRepository3 = AppDataSource.getRepository(Photo);
    const metadataRepository = AppDataSource.getRepository(PhotoMetadata);

    // first we should save a photo
    await photoRepository3.save(photo);

    // photo is saved. Now we need to save a photo metadata
    await metadataRepository.save(metadata);

    // done
    console.log(
      'Metadata is saved, and the relation between metadata and photo is created in the database too'
    );
  })
  .catch((error) => console.log(error));
