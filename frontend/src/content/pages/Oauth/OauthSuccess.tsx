// TODO(holostaff): wire identify() into your sign-in completion path, and clearIdentity() into
//   your sign-out path. Examples:
//
//     import { holostaff } from '@holostaff/sdk'
//     holostaff.identify(user.id)
//     holostaff.clearIdentity()
import SuspenseLoader from '../../../components/SuspenseLoader';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export default function OauthSuccess() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loginInternal } = useAuth();
  const token = searchParams.get('token');
  useEffect(() => {
    if (token) {
      loginInternal(token);
    }
  }, [token]);
  return <SuspenseLoader />;
}
