import {
	Navigate,
} from 'react-router-dom';

const NoMatch = () => {
	return <Navigate to="/welcome" />
	// return <p>There's nothing here: 404!</p>;
};

export default NoMatch;