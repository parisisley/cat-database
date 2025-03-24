import PropTypes from "prop-types";
import './CatInfo.css';

const CatInfo = ({ name, origin, lifespan, description }) => {
  return (
    <div className="catInfo-div">
      <p className="catInfo-text">{name}</p>
      <p className="catInfo-text">{origin}</p>
      <p className="catInfo-text">{lifespan}</p>
      <p className="catInfo-text">{description}</p>
    </div>
  );
};

CatInfo.propTypes = {
    name: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    lifespan: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default CatInfo;
