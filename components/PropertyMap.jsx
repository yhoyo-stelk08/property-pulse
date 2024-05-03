'use client';

import { useState, useEffect } from 'react';
import { Map, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { setDefaults, fromAddress } from 'react-geocode';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  // set default parameter of react-geocode
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'id',
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      // make request to google geocoding
      try {
        const response = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );
        const { lat, lng } = response.results[0].geometry.location;

        if (response.results.length === 0) {
            // No Result found
            setGeocodeError(true);
            setLoading(false);
            return;
        }

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchCoordinates();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  // handle case where geocoding failed
  if(geocodeError) {
    return <div className='text-xl'>No Location Data Found</div>
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
            latitude: lat,
            longitude: lng,
            zoom: 15
        }}
        style={{ width: '100%', height: 500}}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Marker longitude={lng} latitude={lat} anchor='bottom'>
            <Image src={pin} alt='location' width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;