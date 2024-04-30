'use client';
import { useState, useEffect } from 'react';
import { fetchProperty } from '@/utils/request';
import { useParams } from 'next/navigation';

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.log('Error fetching property: ', error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);
  return <div>Single Property</div>;
};

export default PropertyPage;
