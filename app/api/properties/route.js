import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getUserSession } from '@/utils/getUserSession';

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const userSession = await getUserSession();

    if (!userSession || !userSession.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = userSession;

    const formData = await request.formData();

    // Access all values from amenities and images
    const amenities = formData.getAll('amenities');
    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');
    // create propertyData object for database

    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      baths: formData.get('baths'),
      amenities,
      rates: {
        weekly: parseInt(formData.get('rates.weekly')),
        monthly: parseInt(formData.get('rates.monthly')),
        nightly: parseInt(formData.get('rates.nightly')),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
      // images,
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 200,
    // });
  } catch (error) {
    console.log(error);
    return new Response('Failed to add property', { status: 500 });
  }
};
