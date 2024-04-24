import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <>
      <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox
              title="For Renters"
              btnInfo={{
                link: '/properties',
                text: 'Browse Properties',
                bgColor: 'bg-black',
              }}
              bgColor="bg-gray-100"
              textColor="text-black"
            >
              Find your dream rental property. Bookmark properties and contact
              owners.
            </InfoBox>
            <InfoBox
              title="For Property Owners"
              btnInfo={{
                link: '/properties/add',
                text: 'Add Property',
                bgColor: 'bg-blue-500',
              }}
              bgColor="bg-blue-100"
              textColor="text-black"
            >
              List your properties and reach potential tenants. Rent as an
              airbnb or long term.
            </InfoBox>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoBoxes;
