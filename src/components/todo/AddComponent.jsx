import { useState } from 'react';
import { postAdd } from '../../api/todoApi';
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
  title: '',
  writer: '',
  dueDate: '',
};

const AddComponent = () => {
  const [todo, setTodo] = useState({ ...initState });

  // result에 결과 데이터가 있으면 modal 띄우기 (modal 띄우기 여부)
  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove();

  // input 태그 change 핸들러
  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  // save 버튼 클릭이벤트 핸들러 : 서버API 호출 -> 저장
  const handleClickSave = () => {
    console.log(todo);
    postAdd(todo)
      .then((data) => {
        console.log(data);
        setResult(data.TNO);
        setTodo({ ...initState }); // 입력란과 todo state 초기화
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 모달 닫는 버튼 callback 함수
  const closeModal = () => {
    setResult(null); // result null 처리
    moveToList(); // list로 리다이렉트
  };

  return (
    <>
      {result ? (
        <ResultModal
          title={'Add Success'}
          content={`New Todo #${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              New Todo
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={todo.title}
                    onChange={handleChangeTodo}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="writer"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Writer
                </label>
                <div className="mt-2">
                  <input
                    id="writer"
                    name="writer"
                    type="text"
                    value={todo.writer}
                    onChange={handleChangeTodo}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="dueDate"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Due Date
                </label>
                <div className="mt-2">
                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={todo.dueDate}
                    onChange={handleChangeTodo}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleClickSave}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddComponent;
