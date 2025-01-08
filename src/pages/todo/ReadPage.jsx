import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/todo/ReadComponent';

const ReadPage = () => {
  // 경로 주소에서 tno 꺼내기
  const { tno } = useParams();

  return (
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <h3>Todo Read Page</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <ReadComponent tno={tno}></ReadComponent>
        </div>
      </div>
    </>
  );
};

export default ReadPage;
