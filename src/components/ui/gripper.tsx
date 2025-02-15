import { GripVertical } from "lucide-react";

const Gripper = () => {
  return (
    <GripVertical height={16} className='relative flex text-zinc-600 hover:text-zinc-500 cursor-grab active:cursor-grabbing transition-all' />
  )
}

export default Gripper;