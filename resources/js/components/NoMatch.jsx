import {
	Navigate,
} from 'react-router-dom';

const NoMatch = () => {
	return <Navigate to="/welcome" />
};

export default NoMatch;