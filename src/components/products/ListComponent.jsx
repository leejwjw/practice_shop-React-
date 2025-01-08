import { useEffect, useState } from 'react';
import useCustomMove from '../../hooks/useCustomMove';
import { getList } from '../../api/productsApi';
import { API_SERVER_HOST } from '../../api/todoApi';
import PageComponent from '../../components/common/PageComponent';
import useCustomLogin from '../../hooks/useCustomLogin';

const host = API_SERVER_HOST;

const initState = {
  list: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const [serverData, setServerData] = useState(initState);
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const { exceptionHandle } = useCustomLogin();

  useEffect(() => {
    getList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {serverData.list.map((product) => (
            <div
              key={product.pno}
              className="group"
              onClick={() => moveToRead(product.pno)}
            >
              <img
                alt={`product ${product.pname}`}
                src={`${host}/api/products/view/th_${product.uploadFileNames[0]}`}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.pname}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
      <PageComponent serverData={serverData} move={moveToList} />
    </div>
  );
};

export default ListComponent;
