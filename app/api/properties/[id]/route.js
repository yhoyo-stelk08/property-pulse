import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getUserSession } from '@/utils/getUserSession';

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response('Property Not Found', { status: 404 });
    }
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const propertyId = params.id;

    const userSession = await getUserSession();

    if (!userSession || !userSession.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = userSession;

    const property = await Property.findById(propertyId);

    if (!property) {
      return new Response('Property Not Found', { status: 404 });
    }

    // verify ownership of property
    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // if ownership verified
    await property.deleteOne();

    return new Response('Property Deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const propertyId = params.id;
    const userSession = await getUserSession();

    if (!userSession || !userSession.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = userSession;

    const formData = await request.formData();

    // Access all values from amenities and images
    const amenities = formData.getAll('amenities');

    // get property to update
    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) {
      return new Response('Property Not Found', { status: 404 });
    }

    // verify ownership of property
    if (existingProperty.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

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
        weekly: parseInt(formData.get('rates.weekly')) || 0,
        monthly: parseInt(formData.get('rates.monthly')) || 0,
        nightly: parseInt(formData.get('rates.nightly')) || 0,
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    // Update property in database
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      propertyData
    );

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to update property', { status: 500 });
  }
};
