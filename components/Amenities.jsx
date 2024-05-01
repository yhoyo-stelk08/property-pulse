const Amenities = ({ name, id, value,isChecked, onChange }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        className="mr-2"
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

export default Amenities;
