const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;


// function to fetch all properties
async function fetchProperties() {
  try {
    // handle the case where domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const response = await fetch(`${apiDomain}/properties`, {cache: 'no-store'});

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// function to fetch single property
async function fetchProperty(id) {
    try {
      // handle the case where domain is not available yet
      if (!apiDomain) {
        return null;
      }
  
      const response = await fetch(`${apiDomain}/properties/${id}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export { fetchProperties, fetchProperty };
