import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/products/ReadComponent';

const ReadPage = () => {
  const { pno } = useParams();

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <ReadComponent pno={pno} />
      </div>
    </div>
  );
};

export default ReadPage;
