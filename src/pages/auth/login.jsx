import React from 'react'
import LoginComponent from '../../components/Auth/LoginComponent/index'

const Login = ({ redirect }) => {
  console.log(redirect);
  return (
    <div className='Login'>
      <LoginComponent redirect={redirect} />
    </div>
  )
}
export default Login;

export async function getServerSideProps(context) {
  // console.log(context.query.redirect)
  if (context?.query?.redirect !== undefined) {
    return {
      props: { redirect: context.query.redirect }
    }
  }else {
    return {
      props: { redirect: 'profile' }
    }
  }
}