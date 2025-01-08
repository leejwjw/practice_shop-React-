import axios from 'axios';
import { API_SERVER_HOST } from './todoApi';
import jwtAxios from '../util/jwtUtil';

const host = `${API_SERVER_HOST}/api/products`;

// 상품 등록
export const postAdd = async (product) => {
  const hearder = { headers: { 'Content-Type': 'multipart/form-data' } }; // 파일전송위해
  const result = await jwtAxios.post(`${host}/`, product, hearder);
  return result.data;
};

// 목록 조회
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const result = await jwtAxios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return result.data;
};

// 상품 1개 조회
export const getOne = async (pno) => {
  const result = await jwtAxios.get(`${host}/${pno}`);
  return result.data;
};

// 상품 수정
export const putOne = async (pno, product) => {
  const header = { headers: { 'Content-Type': 'multipart/form-data' } };
  const result = await jwtAxios.put(`${host}/${pno}`, product, header);
  return result.data;
};

// 상품 삭제
export const deleteOne = async (pno) => {
  const result = await jwtAxios.delete(`${host}/${pno}`);
  return result.data;
};
