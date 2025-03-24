import PropTypes from "prop-types";

const Card = ({category, desc, extra}) => {
    return (
        <div className="oneCard-div">
            <h3>{desc}</h3>
            <h4>{category}</h4>
            <p>{extra}</p>
        </div>
    );
};

Card.propTypes = {
  category: PropTypes.string.isRequired,
  desc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  extra: PropTypes.string.isRequired,
};


export default Card;