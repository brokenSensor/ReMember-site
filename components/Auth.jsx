import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

function Auth({ children }) {
	const [session, loading] = useSession();
	const router = useRouter();
	useEffect(() => {
		if (!session || window.location.pathname !== '/login') {
			return;
		}
	}, [window]);
	return children;
}

export default Auth;
