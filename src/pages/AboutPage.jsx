import useCustomLogin from '../hooks/useCustomLogin';
import BasicLayout from '../layouts/BasicLayout';

const AboutPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  if (!isLogin) {
    return moveToLoginReturn();
  }
  return (
    <BasicLayout>
      <h3>About Page</h3>
    </BasicLayout>
  );
};

export default AboutPage;
