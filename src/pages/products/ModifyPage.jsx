import { useParams } from 'react-router-dom';
import ModifyComponent from '../../components/products/ModifyComponent';

const ModifyPage = () => {
  const { pno } = useParams();

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <ModifyComponent pno={pno} />
      </div>
    </div>
  );
};

export default ModifyPage;
