import {useSelector} from 'react-redux';


export const UserWrapper = ({children}) => {
  const {user} = useSelector((state) => state.userReducer);
  if (!user) {
    return <></>;
  }
  return (
    <>{children}</>
  );
};
