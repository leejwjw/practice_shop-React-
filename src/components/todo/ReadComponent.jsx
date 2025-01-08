import { useEffect, useState } from 'react';
import { getOne } from '../../api/todoApi';
import useCustomMove from '../../hooks/useCustomMove';

// todo state 초기화 객체
const initState = {
  tno: 0,
  title: '',
  writer: '',
  dueDate: null,
  completed: false,
};

const ReadComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initState);

  const { moveToList, moveToModify } = useCustomMove();

  // API 서버에 tno주고 해당 todo 받아오기
  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
    });
  }, [tno]);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Detail #{todo.tno}
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {makeDiv('Tno', todo.tno)}
          {makeDiv('Writer', todo.writer)}
          {makeDiv('Title', todo.title)}
          {makeDiv('Due Date', todo.dueDate)}
          {makeDiv('Completed', todo.completed ? 'Completed' : 'Not Yet')}
        </dl>
      </div>
      <div className="my-6 flex float-right">
        <button
          type="button"
          onClick={() => moveToList()}
          className="rounded-md mr-2 bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          List
        </button>
        <button
          type="button"
          onClick={() => moveToModify(tno)}
          className="rounded-md bg-rose-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Modify
        </button>
      </div>
    </div>
  );
};

const makeDiv = (title, value) => (
  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt className="text-sm/6 font-medium text-gray-900">{title}</dt>
    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
      {value}
    </dd>
  </div>
);

export default ReadComponent;
