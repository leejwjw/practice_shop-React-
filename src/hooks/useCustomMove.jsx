import { useState } from 'react';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const getQuery = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate(); // 이동할 때 필요
  const [queryParams] = useSearchParams(); // 쿼리스트링조회 page,size
  const [refresh, setRefresh] = useState(false); // 목록 페이지 데이터 갱신(refresh) 토글

  // queryString default 설정
  const page = getQuery(queryParams.get('page'), 1);
  const size = getQuery(queryParams.get('size'), 12);
  const queryDefault = createSearchParams({ page, size }).toString(); // default querystring

  // 리스트로 이동 (리스트버튼, 페이지번호 눌러 이동시에도 사용)
  const moveToList = (pageParam) => {
    // pageParam = {page: 3, size:10}
    let queryStr = '';
    if (pageParam) {
      const pageNum = getQuery(pageParam.page, 1);
      const sizeNum = getQuery(pageParam.size, 12);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }
    setRefresh(!refresh);
    navigate({ pathname: `../list`, search: queryStr });
  };

  // 수정/삭제로 이동
  const moveToModify = (num) => {
    navigate({ pathname: `../modify/${num}`, search: queryDefault });
  };

  // 조회(상세) 페이지 이동
  const moveToRead = (num) => {
    navigate({ pathname: `../read/${num}`, search: queryDefault });
  };

  return { moveToList, moveToModify, moveToRead, refresh, page, size };
};

export default useCustomMove;
