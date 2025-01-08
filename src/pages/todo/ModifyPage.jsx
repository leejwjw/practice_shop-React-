import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import ModifyComponent from '../../components/todo/ModifyComponent';

const ModifyPage = () => {
  const navigate = useNavigate();
  const { tno } = useParams();

  const [queryParams] = useSearchParams();
  const page = queryParams.get('page') ? parseInt(queryParams.get('page')) : 1;
  const size = queryParams.get('size') ? parseInt(queryParams.get('size')) : 10;
  const queryStr = createSearchParams({ page, size }).toString();

  const moveToRead = () => {
    navigate({ pathname: `/todo/read/${tno}`, search: queryStr });
  };
  const moveToList = () => {
    navigate({ pathname: `/todo/list`, search: queryStr });
  };

  return (
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <div>Modify Page</div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <ModifyComponent tno={tno} />
        </div>
      </div>
    </>
  );
};

export default ModifyPage;
