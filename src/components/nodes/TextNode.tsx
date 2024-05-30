'use client';

import { BiMessageRoundedDetail } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa';
import { Handle, NodeProps, Position } from 'reactflow';

type Props = NodeProps;

const TextNode: React.FC<Props> = ({ selected = false, data }) => {
  return (
    <div
      className={`min-h-20 w-96 rounded-md shadow-lg flex flex-col transition-all ${
        selected ? 'border-2 border-cyan-700 shadow-2xl' : ''
      }`}
    >
      <div className='bg-[#B0F1E2] rounded-tr-md rounded-tl-md py-1 px-4 h-[20%] flex items-center'>
        <div className='flex-grow flex items-center'>
          <BiMessageRoundedDetail fontSize='12px' />
          <span className='text-[14px] font-extrabold ml-1'>Send Message</span>
        </div>
        <FaWhatsapp fontSize='20px' className='bg-white text-green-500, p-1 rounded-2xl' />
      </div>
      <div className='bg-white min-h-12 rounded-br-md rounded-bl-md px-3 py-2'>{data?.content}</div>
      <Handle type='source' position={Position.Right} id='b' />
      <Handle type='target' position={Position.Left} id='a' />
    </div>
  );
};

export default TextNode;
