import { useRef, useState } from "react";
import { Programs } from "../../types/dataTypes";

interface courseProgramsProps {
  initialPrograms: Programs;
}

function CoursePrograms({ initialPrograms }: courseProgramsProps) {
  const [interacted, setInteracted] = useState(false);
  const [programs, setPrograms] = useState(initialPrograms || []);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (index: number): void => {
    dragItem.current = index;
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault();
  };

  const handleDragEnter = (index: number): void => {
    dragOverItem.current = index;
  };

  const handleDragEnd = (): void => {
    if (dragItem.current === null || dragOverItem.current === null) return;

    const newItems = [...programs];

    const draggedItemContent = newItems[dragItem.current];

    newItems.splice(dragItem.current, 1);

    newItems.splice(dragOverItem.current, 0, draggedItemContent);

    newItems.forEach((item, index) => {
      item.order = index + 1;
    });

    dragItem.current = null;
    dragOverItem.current = null;
    setPrograms(newItems);
    setInteracted(true);
  };

  const handleConfirm = (): void => {
    console.log("Новий порядок елементів:", programs);
    setInteracted(false);
  };

  return (
    <div className="mx-auto max-w-md rounded bg-white p-4 shadow">
      <h2 className="mb-4 text-xl font-bold">
        Перетягніть елементи для зміни порядку
      </h2>

      <ul className="mb-4">
        {programs.map((item, index) => (
          <li
            key={item.id}
            className="mb-2 flex cursor-move items-center justify-between rounded bg-gray-100 p-3"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center">
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                {item.order}
              </span>
              <span>{item.title}</span>
            </div>
            <span className="text-sm text-gray-500">ID: {item.id}</span>
          </li>
        ))}
      </ul>

      {interacted && (
        <button
          onClick={handleConfirm}
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
          Підтвердити
        </button>
      )}
    </div>
  );
}

export default CoursePrograms;
