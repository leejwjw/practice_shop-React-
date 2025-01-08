import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// email 값이 있으면 로그인으로 간주, 그렇지 않으면 비로그인 상태로 처리
const initState = {
  email: '',
};

const loadMemberCookie = () => {
  const memberInfo = getCookie('member');
  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  return memberInfo;
}
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: initState,
  reducers: {
    // action 크리에이터 + 리듀서 로직
    login: (state, action) => {
      console.log('login.....');
      // {email, password} 전달받은 값 꺼내기
      const data = action.payload;
      // 새로운 state값 리턴
      return { email: data.email };
    },
    logout: (state, action) => {
      console.log('logout!!');
      return { ...initState };
    },
    }
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 처리
export const { login, logout } = loginSlice.actions;

// reducer는 configureStore에 리듀서 등록하기 위해 export 처리
export default loginSlice.reducer;
