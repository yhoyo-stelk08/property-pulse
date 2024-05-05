'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { PropertyCard } from '@/components/PropertyCard';
import PropertySearchForm from '@/components/PropertySearchForm';
import Spinner from '@/components/Spinner';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoPropertyMessage, setShowNoPropertyMessage] = useState(false);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  useEffect(() => {
    try {
      const fetchSearchResults = async () => {
        const response = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          setProperties([]);
          return new Response('Failed to fetch search results', {
            status: 500,
          });
        }
      };

      fetchSearchResults();

      // Show "No property listed" message after 3 seconds if no properties are found
      const timer = setTimeout(() => {
        if (properties.length === 0) {
          setShowNoPropertyMessage(true);
        }
      }, 3000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
      return new Response('Failed to fetch search results', {
        status: 500,
      });
    } finally {
      setLoading(false);
    }
  }, [location, propertyType]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <Link
          href="/"
          className="flex items-center text-blue-500 hover:underline mb-3"
        >
          <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to Home
        </Link>
        <section className="bg-blue-700 py-4 mb-4">
          <div className="max-w-7x mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
            <PropertySearchForm />
          </div>
        </section>
        <h1 className="text-2xl mb-4">Search Result:</h1>
        {properties.length === 0 ? (
          showNoPropertyMessage ? (
            <p className="text-2xl mb-4">No properties found.</p>
          ) : (
            <Spinner loading={true} />
          )
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
