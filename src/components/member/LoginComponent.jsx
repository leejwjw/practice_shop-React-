import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCustomLogin from '../../hooks/useCustomLogin';
import KakaoLoginComponent from './KakaoLoginComponent';

const initState = {
  email: '',
  password: '',
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = () => {
    //dispatch(login(loginParam)); // 동기요청임 -> API서버 요청을 위해 비동기로 변경
    /* 비동기 요청으로 변경
    dispatch(loginPostAsync(loginParam))
      .unwrap() // 비동기 요청후 처리된 결과를 받아보려면 unwrap한 후 then()으로 받기
      .then((data) => {
        console.log('after unwrap!!!');
        console.log(data);
        if (data.error) {
          alert('이메일 또는 비밀번호를 다시 확인하세요.');
        } else {
          alert('로그인 성공!');
          navigate({ pathname: `/` }, { replace: true }); // 홈으로 리다이렉트
        }
      });*/
    // useCustomLogin hook으로 변경
    doLogin(loginParam).then((data) => {
      console.log(data);
      if (data.error) {
        alert('이메일 또는 비밀번호를 다시 확인하세요.');
      } else {
        alert('로그인 성공!');
        moveToPath('/'); // 홈으로 리다이렉트
      }
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  type="text"
                  value={loginParam.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  value={loginParam.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm/6">
                <Link
                  to="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleClickLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </div>

          {/* 소셜로그인 */}
          <KakaoLoginComponent />
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{' '}
          <span
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
