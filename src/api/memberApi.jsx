import axios from 'axios';
import { API_SERVER_HOST } from './todoApi';
import jwtAxios from '../util/jwtUtil';

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam) => {
  const header = { headers: { 'Content-Type': 'x-www-form-urlencoded' } };
  const form = new FormData();
  form.append('username', loginParam.email);
  form.append('password', loginParam.password);

  const result = await axios.post(`${host}/login`, form, header);
  return result.data;
};

export const modifyMember = async (member) => {
  const result = await jwtAxios.put(`${host}/modify`, member);
  return result.data;
};
