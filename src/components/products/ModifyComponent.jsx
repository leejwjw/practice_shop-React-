import { useEffect, useRef, useState } from 'react';
import { deleteOne, getOne, putOne } from '../../api/productsApi';
import ResultModal from '../common/ResultModal';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { API_SERVER_HOST } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';

const host = API_SERVER_HOST;

const initState = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  delFlag: false,
  uploadFileNames: [],
};

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState({ ...initState });
  const [result, setResult] = useState(null); // 결과 modal
  const uploadRef = useRef();
  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(pno).then((data) => {
      console.log(data);
      setProduct(data);
    });
  }, [pno]);

  // 입력란 수정시 change 이벤트 핸들러
  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  // 기존이미지 삭제delete 버튼 클릭 이벤트 핸들러
  const deleteOldImages = (imageName) => {
    // 기존 이미지에서 삭제 버튼 클릭한 이미지를 제외시키기
    const resultFileNames = product.uploadFileNames.filter(
      (filename) => filename !== imageName
    );
    product.uploadFileNames = resultFileNames;
    setProduct({ ...product });
  };

  // 저장버튼 이벤트 핸들러
  const handleClickModify = () => {
    const formData = new FormData();
    // 새로 추가하는 이미지 파일
    const files = uploadRef.current.files;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]); // -> List<MultipartFile> files
    }
    // 나머지 데이터
    formData.append('pname', product.pname);
    formData.append('pdesc', product.pdesc);
    formData.append('price', product.price);
    formData.append('delFlag', product.delFlag);
    // 기존 이미지중 남긴것
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append('uploadFileNames', product.uploadFileNames[i]); //-> List<String> uploadFileNames
    }

    putOne(pno, formData).then((data) => {
      console.log(data);
      setResult('Modified');
    }); // api 서버에 수정 요청 -> 결과 모달 띄우기
  };

  // 상품 삭제 버튼 delete 클릭 이벤트 핸들러
  const handleClickDelete = () => {
    deleteOne(pno).then((data) => {
      console.log(data);
      setResult('Deleted');
    });
  };

  // 결과 모달 닫기버튼 클릭 이벤트 핸들러
  const closeModal = () => {
    if (result === 'Modified') {
      moveToRead(pno); // Read페이지로 이동
    } else if (result === 'Deleted') {
      moveToList({ page: 1 }); // 리스트로 이동
    }
    setResult(null);
  };

  return (
    <>
      {result ? (
        <ResultModal
          title={'Result'}
          content={`${result}번 상품 처리 완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Modify Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    name="pname"
                    type="text"
                    value={product.pname}
                    onChange={handleChangeProduct}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="pdesc"
                    value={product.pdesc}
                    onChange={handleChangeProduct}
                    rows={4}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {product.pdesc}
                  </textarea>
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write details about product.
                </p>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChangeProduct}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Delete
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    name="delFlag"
                    value={product.delFlag}
                    onChange={handleChangeProduct}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value={false}>사용</option>
                    <option value={true}>삭제</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
              {/* old images */}
              <div className="bg-white col-span-full">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                  <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                    {product.uploadFileNames.map((image, idx) => (
                      <div
                        key={idx}
                        className="group relative aspect-[2/1] overflow-hidden rounded-lg sm:row-span-2 sm:aspect-square"
                      >
                        <img
                          alt={product.pname}
                          src={`${host}/api/products/view/${image}`}
                          className="absolute size-full object-cover group-hover:opacity-75"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
                        />
                        <div className="absolute inset-0 flex items-end p-6">
                          <button
                            type="button"
                            onClick={() => deleteOldImages(image)}
                            className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* add images */}
              <div className="col-span-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Add Product Images
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-300"
                    />
                    <div className="mt-4 flex justify-center text-sm/6 text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          ref={uploadRef}
                          multiple={true}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleClickDelete}
            className="rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleClickModify}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Modify
          </button>
          <button
            type="button"
            onClick={moveToList}
            className="rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            List
          </button>
        </div>
      </form>
    </>
  );
};

export default ModifyComponent;
