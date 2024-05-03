'use client';
import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data from api
  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await fetch(`/api/bookmarks`);

        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.log(response.statusText);
          toast.error('Failed to fetch saved properties');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch saved properties');
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);
  {
    loading && <Spinner loading={loading} />;
  }

  return (
    <>
      {!loading && (
        <section className="px-4 py-6">
          <h1 className='text-center text-4xl md:text-3xl mb-20 text-blue-500 font-black'>Saved Properties</h1>
          <div className="container-xl lg:container m-auto px-4 py-6">
            {properties.length === 0 ? (
              <p>No Properties Saved</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SavedProperties;
