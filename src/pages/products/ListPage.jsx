import ListComponent from '../../components/products/ListComponent';

const ListPage = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <ListComponent />
      </div>
    </div>
  );
};

export default ListPage;
