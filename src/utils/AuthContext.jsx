import { createContext, useState, useEffect, useContext } from 'react';
import { account } from '../appwriteConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getUserOnLoad();
	}, []);

	const getUserOnLoad = async () => {
		try {
			const accountDetails = await account.get();
			console.log(accountDetails);
			setUser(accountDetails);
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
	};

	const handleUserLogin = async (e, credentials) => {
		e.preventDefault();

		try {
			const response = await account.createEmailSession(
				credentials.email,
				credentials.password
			);
			console.log(response);
			const accountDetails = await account.get();
			setUser(accountDetails);
			navigate('/');
		} catch (error) {
			console.error(error);
		}
	};

	const handleUserLogout = async () => {
		await account.deleteSession('current');
		setUser(null);
	};

	const contextData = {
		user,
		handleUserLogin,
		handleUserLogout,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? <p>Loading...</p> : children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthContext;