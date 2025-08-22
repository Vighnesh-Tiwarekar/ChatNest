import React from 'react'

export const Confirm = ({handleConfirm , contact}) => {


    return (
        <>
            <div className='fixed inset-0 bg-[#00000092] z-50 flex items-center justify-center'>

                <main className='w-fit mx-auto py-[20px] signcard bg-black'>

                    <section className='text-center px-[20px]'>

                        <div className='font-bold mt-[10px] sm:flex'>
                            <p>Are you sure you want to </p> 
                            <p>&nbsp;send a request to </p>
                            <div>&nbsp;{contact}?</div>
                        </div>

                        <div className='flex mt-[20px]'>

                            <button className='w-fit mx-auto btn txteffect glass mt-[10px]' type='button' onClick={()=> handleConfirm(true)}>
                                Yes
                            </button>

                            <button className='w-fit mx-auto btn txteffect glass mt-[10px]' type='submit' onClick={()=> handleConfirm(false)}>
                                No
                            </button>

                        </div>

                    </section>

                </main>

            </div>
        </>
    )
}
