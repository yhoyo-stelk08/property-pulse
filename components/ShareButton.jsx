import { FaShare } from 'react-icons/fa';
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

const ShareButton = ({ property }) => {
  const urlShare = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={urlShare}
          hashtag={`#${property.type.replace(/\s/g, '')}ForRent`.trim()}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={urlShare}
          title={property.name}
          hashtags={[`#${property.type.replace(/\s/g, '')}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton
          url={urlShare}
          title={property.name}
          separator=':: '
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          url={urlShare}
          subject={property.name}
          body={`Check out this property: ${urlShare}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButton;
