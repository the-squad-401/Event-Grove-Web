import useAuth from './hook';

function Auth(props) {
  let { user } = useAuth();
  let { types } = props;

  if(!user) {
    return null;
  }

  if(types && !types.includes(user.type)) {
    return null;
  }

  return props.children;
}

export default Auth;