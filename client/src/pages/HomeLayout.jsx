import { Outlet } from "react-router-dom"


const HomeLayout = () => {
  return (
    <>
    <section className='align-element py-20'>
        <Outlet />
      </section>
    </>
  )
}

export default HomeLayout