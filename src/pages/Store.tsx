import CartItems from "../components/CartItems"


function Store() {
  return (
    <>
    <section className=' grid grid-col-1 grid-rows-4 m-16 gap-10 justify-center mt-24'>
         <CartItems Name={'computer'} Price={30000} id={1}/>
    </section>

    </>
  )
}

export default Store