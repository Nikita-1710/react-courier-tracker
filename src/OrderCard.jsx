import { Trash2 as TrashIcon } from 'lucide-react'

const STATUS_PRIORITY_CLASSES = {
    "Dispatched": "border-l-8 border-l-blue-500",
    "On The Way": "border-l-8 border-l-yellow-500",
    "Delivered": "border-l-8 border-l-green-500",
    "Rejected": "border-l-8 border-l-red-500",
    "Attempted": "border-l-8 border-l-purple-500",
    "Order Placed": "border-l-8 border-l-indigo-500",
};


const BADGE_PRIORITY_CLASSES = {
    "Dispatched": "text-blue-500 border border-blue-500",
    "On The Way": "text-yellow-500 border border-yellow-500",
    "Delivered": "text-green-500 border border-green-500",
    "Rejected": "text-red-500 border border-red-500",
    "Attempted": "text-purple-500 border border-purple-500",
    "Order Placed": "text-indigo-500 border border-indigo-500",
};


function OrderCard({ task, priority, index, onDelete }) {
    return (
        <div className={`bg-white p-5 m-5 rounded-md shadow-lg relative ${STATUS_PRIORITY_CLASSES[priority]}`}>
            <span className={`block w-[100px] border text-center rounded-full ${BADGE_PRIORITY_CLASSES[priority]}`}>
                {priority}
            </span>

            <h1 className="mt-2 text-xl">{task}</h1>

            <TrashIcon
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => onDelete(index)}
            />
        </div>
    );
}

export default OrderCard;
