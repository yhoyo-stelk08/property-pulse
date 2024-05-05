'use client';
import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { fetchProperties } from '@/utils/request';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchPropertiesData = async () => {
        const propertiesData = await fetchProperties();
        // console.log(propertiesData);
        setProperties(propertiesData);
      };

      fetchPropertiesData();
    } catch (error) {
        console.log('Failed to fetch properties: ',error);
    } finally {
      setLoading(false);
    }
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No Properties Listed</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
