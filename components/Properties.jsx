'use client';
import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';
import Spinner from '@/components/Spinner';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 6,
    totalItem: 0,
  });

  useEffect(() => {
    try {
      const fetchPropertiesData = async () => {
        const response = await fetch(
          `/api/properties?page=${pagination.page}&pageSize=${pagination.pageSize}`
        );
        const data = await response.json();
        // console.log(data.properties);
        setProperties(data.properties);
        setPagination((prevValue) => ({
          ...prevValue,
          totalItem: data.total,
        }));
      };

      fetchPropertiesData();
    } catch (error) {
      console.log('Failed to fetch properties: ', error);
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  const handlePageChange = async (newPage) => {
    setPagination((prevValue) => ({
        ...prevValue,
        page: newPage
    }))
  }

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
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </section>
  );
};

export default Properties;
