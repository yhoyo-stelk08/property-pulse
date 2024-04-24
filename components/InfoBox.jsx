const InfoBox = ({ title, bgColor, textColor, btnInfo, children }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{title}</h2>
      <p className={`${textColor} mt-2 mb-4`}>
        {children}
      </p>
      <a
        href={btnInfo.link}
        className={`${btnInfo.bgColor} text-white inline-block rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {btnInfo.text}
      </a>
    </div>
  );
};

export default InfoBox;
