import AddComponent from '../../components/todo/AddComponent';

const AddPage = () => {
  return (
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <div>Add Page</div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <AddComponent />
        </div>
      </div>
    </>
  );
};

export default AddPage;
