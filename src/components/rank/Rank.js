import React from 'react';

const Rank = ({name, entries}) => {
  // console.log(username, entries);
  return (
    <div className=" white">
      <div className='f3'>
        {name + ' , your rank is ....'}
      </div>
      <div className='f1'>
        {entries}
      </div>
    </div>
  )
}

export default Rank;