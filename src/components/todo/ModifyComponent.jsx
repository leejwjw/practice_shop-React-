import { useEffect, useState } from 'react';
import { deleteOne, getOne, putOne } from '../../api/todoApi';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import ResultModal from '../common/ResultModal';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
  tno: 0,
  title: '',
  writer: '',
  dueDate: null,
  completed: false,
};

const ModifyComponent = ({ tno }) => {
  const [todo, setTodo] = useState({ ...initState });

  // 모달창 open 여부
  const [result, setResult] = useState(null);

  // 페이지 이동
  const { moveToList, moveToRead } = useCustomMove();

  // tno로 todo 조회 해오기
  useEffect(() => {
    getOne(tno).then((data) => setTodo(data));
    console.log(todo);
  }, [tno]);

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  const handleChangeSelect = (e) => {
    const value = e.target.value;
    todo.completed = value === 'Y';
    setTodo({ ...todo });
  };

  const handleClickDelete = () => {
    deleteOne(tno).then((data) => {
      console.log('delete!!', data);
      setResult('Deleted');
    });
  };
  const handleClickModify = () => {
    putOne(todo).then((data) => {
      console.log('modify!!', data);
      setResult('Modified');
    });
  };

  // 모달 닫힐때 이벤트 처리
  const closeModal = () => {
    if (result === 'Deleted') {
      // 리스트로 이동
      moveToList();
    } else {
      // 상세페이지로 이동
      moveToRead(tno);
    }
  };

  return (
    <>
      {result ? (
        <ResultModal
          title={'Result'}
          content={result}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Modify</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="tno"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Tno
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    id="tno"
                    name="tno"
                    type="text"
                    value={todo.tno}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
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
                    readOnly
                    id="writer"
                    name="writer"
                    type="text"
                    value={todo.writer}
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

              <div className="sm:col-span-4">
                <label
                  htmlFor="completed"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Completed
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="completed"
                    name="completed"
                    value={todo.completed ? 'Y' : 'N'}
                    onChange={handleChangeSelect}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="Y">Completed</option>
                    <option value="N">Not Yet</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleClickDelete}
            className="rounded-md bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={handleClickModify}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Modify
          </button>
        </div>
      </form>
    </>
  );
};

export default ModifyComponent;
