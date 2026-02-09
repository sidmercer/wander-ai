
export const SelectBudgetOptions = [

    {

        id: 1,

        title: 'Cheap',

        desc: 'Stay conscious of costs',

        icon: '💵',

        color: 'bg-green-100 text-green-600'

    },

    {

        id: 2,

        title: 'Moderate',

        desc: 'Keep cost on the average side',

        icon: '💰',

        color: 'bg-yellow-100 text-yellow-600'

    },

    {

        id: 3,

        title: 'Luxury',

        desc: 'Don’t worry about cost',

        icon: '💸',

        color: 'bg-purple-100 text-purple-600'

    },

]

function BudgetUi({ onSelectedOptions }:any) {
  return (
     <div className='grid grid-cols-2 md:grid-cols-3  gap-2 items-center mt-1' >
            {SelectBudgetOptions.map((item,index)=> (
            <div key={index} className='border p-4 rounded-lg hover:border-primary cursor-pointer bg-white flex flex-col items-center'
            onClick={()=>onSelectedOptions(item.title+":"+item.desc) }
            >
                
                    <div className={`text-3xl p-3 rounded-full ${item.color} `}>{item.icon}</div>
                    <h2 className="text-lg font-semibold m-2">{item.title}</h2>
                    <p className="text-sm text-gray-500" >{item.desc}</p>
            </div>  
            ))}   
        
        </div>
  )
}

export default BudgetUi